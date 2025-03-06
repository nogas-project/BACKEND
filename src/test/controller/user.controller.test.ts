import requests from "supertest";
import app, {server} from "../../index";
import {afterAll, afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {UserService as us} from "../../service/user.service";
import {AuthService as auth} from "../../service/auth.service";
let token : string;
let id : number | string;
beforeEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");

    await auth.register("test", "test", "test90@gmail.com", "gas-123", "514-863-9090", false);
    const r = await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", true);
    const res = await auth.login("test@gmail.com","gas-123");
    // @ts-ignore
    id = r.mess!;
    token = res.mess;
    console.log(id)
    console.log(token)
})
afterEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");

})
afterAll(() => {
    server.close();
})

describe("userController", () => {
    describe("modify", () => {
        test("Should be able to modify user", async () => {
            const res = await requests(app)
                .put("/api/user/"+id)
                .auth(token,{type:'bearer'})
                .send({"first_name": "modified",
                    "last_name": "controller",
                    "email": "test@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(200);
        })
        test("Should not be able to modify user because email exits", async () => {
            await auth.register("Test", "test", "test60@gmail.com", "test", "514-851-9013", false)
            const res = await requests(app)
                .put("/api/user/"+id)
                .auth(token,{type:'bearer'})
                .send({"first_name": "modified",
                    "last_name": "controller",
                    "email": "test60@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(404);
            expect(res.body.mess).toBe("Email already exists");
        })
        test("Should not be able to modify user because invalid token", async () => {
            await auth.register("Test", "test", "test60@gmail.com", "test", "514-851-9013", false)
            const res = await requests(app)
                .put("/api/user/"+id)
                .send({"first_name": "modified",
                    "last_name": "controller",
                    "email": "test60@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(403);
        })
    })
})