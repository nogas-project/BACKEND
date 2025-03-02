import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import { AuthService as auth } from "../../service/auth.service";
import {UserService as us} from "../../service/user.service";
import {ContactService as cs} from "../../service/contact.service";
import {config} from "../../config/config"
import requests from "supertest";
import app, {server} from "../../index";
let userId: number;
let token: string;
beforeEach(async () => {
    await us.deleteUser("0");
    const res = await auth.register("test", "test", "test3@gmail.com", "gas-123", "514-863-9090", true);
    userId = <number>res.mess;
    await cs.addContact("admin", config.GMAIL!, userId );
    let r= await auth.login("test3@gmail.com","gas-123");
    token = r.mess;
})
afterEach(async () => {
    await cs.deleteContact(0);
    await us.deleteUser("0");
})
afterAll(() => {
    server.close();
})
describe("EmailController", () => {
    describe("Send email to Contact", () => {
        test("Should be able to send email to Contact", async () => {
            const res = await requests(app)
                .post("/sendEmail/"+userId)
                .auth(token,{type:'bearer'})
            expect(res.status).toBe(200);
        }, 60000)
    })
    describe("Send email to someone - Admin only -", () => {
        test("Should be able to send email", async () => {
            const res = await requests(app)
                .post("/sendEmail")
                .auth(token,{type:'bearer'})
                .send({"to": config.GMAIL!,"subject": "Test", "mess": "This is an email from the unit test -- email.controller.test.ts"});
            expect(res.status).toBe(200);
        }, 60000)
        test("Should not be able to send email", async () => {
            const res = await requests(app)
                .post("/sendEmail")
                .auth(token,{type:'bearer'})
                .send({"to": "","subject": "", "mess": ""});
            expect(res.body.mess).toBe("Missing parameters");
            expect(res.status).toBe(400);
        }, 60000)
    })

})
