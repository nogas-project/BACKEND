import requests from "supertest";
import app, {server} from "../../index";
import {afterAll, afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {UserService as us} from "../../service/user.service";
import {AuthService as auth} from "../../service/auth.service";
let token : string;
let id : number;
beforeEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
    await auth.register("test", "test", "test90@gmail.com", "gas-123", "514-863-9090", false);
    const r = await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", true);
    const res = await auth.login("test@gmail.com","gas-123");
    // @ts-ignore
    id = r.id!;
    token = res.mess;
})
afterEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");

})
afterAll(() => {
    server.close();
})

describe("authController", () => {
    describe("register", () => {
        test("Should be able to register user", async () => {
            const res = await requests(app)
                .post("/api/auth/register")
                .send({"first_name": "test",
                    "last_name": "controller",
                    "email": "test70@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(201);
        })
        test("Should not be able to register user", async () => {
            const res = await requests(app)
                .post("/api/auth/register")
                .send({"first_name": "test",
                    "last_name": "controller",
                    "email": "test90@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.body).toBe("An account with this email already exists");
            expect(res.status).toBe(400);
        })
    })
    describe("login", () => {
        test("Should be able to login user", async () => {
            const res = await requests(app)
                .post("/api/auth/login")
                .send({"email": "test90@gmail.com",
                    "password": "gas-123"})
            expect(res.status).toBe(200);
        })
        test("Should not be able to login user", async () => {
            const res = await requests(app)
                .post("/api/auth/login")
                .send({"email": "test70.com",
                    "password": "gas-123"})
            expect(res.text).toBe("\"Invalid credentials\"");
        })
    })
})