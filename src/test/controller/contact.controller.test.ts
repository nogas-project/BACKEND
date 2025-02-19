import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import requests from "supertest";
import app, {server} from "../../index";
import {GasService as gs} from "../../service/gas.service";
import {UserService as us} from "../../service/user.service";
import {ContactService as cs} from "../../service/contact.service";
let token: string;
let id: string | number;

beforeAll(async () => {
    await cs.deleteContact(0);
    await cs.deleteContact(1);
    await cs.deleteContact(2);
    await cs.deleteContact(3);
    await us.deleteUser("0");
    await cs.addContact("A", "A_test@gmail.com", 0);
    const r = await us.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", true);
    const res = await us.login("test@gmail.com","gas-123");
    id = r.mess;
    token = res.mess;
})
afterAll(async () => {
    await us.deleteUser("0");
    await cs.deleteContact(0);
    await cs.deleteContact(1);
    await cs.deleteContact(2);
    await cs.deleteContact(3);
    server.close();
})
describe("ContactController", () => {
    describe("Get contacts", () => {
        test("Should return a list of 1 contacts", async () => {
            const res = await requests(app)
                .get("/contacts/"+id)
                .auth(token,{type:'bearer'})
            expect(res.status).toBe(200);
            expect(res.body?.length).toBe(1);

        })
        test("Should not return a list of contacts", async () => {
            const res = await requests(app)
                .get("/contacts/90")
                .auth(token,{type:'bearer'})
            expect(res.text).toBe('Forbidden: NOT ALLOWED');
        })
    })
    describe("Add emergencies contacts", () => {
        test("Should create a contact and return true", async () => {
            const res = await requests(app)
                .post("/contacts/"+id)
                .auth(token,{type:'bearer'})
                .send({"name":"Jean", "email":"jeanTest@gmail.com"});
            expect(res.status).toBe(200);
        })
        test("Should not create a contact and return true", async () => {
            const res = await requests(app)
                .post("/contacts/"+id)
                .auth(token,{type:'bearer'})
                .send({"name":"Jean", "email":"A_test@gmail.com"})
            expect(res.text).toBe("\"This email address is already in use\"");
        })
    })
    describe("Modify contact", () => {
        test("Should modify the data and return true", async () => {
            const res = await requests(app)
                .put("/contacts/"+id)
                .auth(token,{type:'bearer'})
                .send({
                    "name": "Jean francois",
                    "email": "jeanFrancoisTest@gmail.com",
                    "id": "0"
                })
            expect(res.text).toBe("Contact modified successfully");
        })
        test("Should not modify the data and return false", async () => {
            await cs.addContact("C", "C_test@gmail.com",0);
            const res = await requests(app)
                .put("/contacts/"+id)
                .auth(token,{type:'bearer'})
                .send({
                    "name": "Jean francois",
                    "email": "C_test@gmail.com",
                    "id": "0"
                })
            expect(res.text).toBe("\"This email address is already in use\"");
        })
    })
})