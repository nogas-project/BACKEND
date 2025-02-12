import requests from "supertest";
import app, {server} from "../../index";
import {afterAll, afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {UserService as us} from "../../service/user.service";

beforeEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
    await us.register("test", "test", "test90@gmail.com", "gas-123", "514-863-9090", false);
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
    let token : string;
        describe("register", () => {
            test("Should be able to register user", async () => {
                    const res = await requests(app)
                        .post("/user/register")
                        .send({"first_name": "test",
                            "last_name": "controller",
                            "email": "test70@gmail.com",
                            "password": "gas-123",
                            "phone": "514-093-9011"})
                expect(res.body).toBe("User created successfully");
                expect(res.status).toBe(201);
            })
            test("Should not be able to register user", async () => {
                const res = await requests(app)
                    .post("/user/register")
                    .send({"first_name": "test",
                        "last_name": "controller",
                        "email": "test90@gmail.com",
                        "password": "gas-123",
                        "phone": "514-093-9011"})
                expect(res.body).toBe("Email already exists");
                expect(res.status).toBe(400);
            })
        })
        describe("login", () => {
            test("Should be able to login user", async () => {
                const res = await requests(app)
                    .post("/user/login")
                    .send({"email": "test90@gmail.com",
                        "password": "gas-123"})
                token = res.text;
                expect(res.status).toBe(200);
            })
            test("Should not be able to login user", async () => {
                const res = await requests(app)
                    .post("/user/login")
                    .send({"email": "test70.com",
                        "password": "gas-123"})
                expect(res.text).toBe("Invalid credentials");
            })
        })
    describe("modify", () => {
        test("Should be able to modify user", async () => {
            const res = await requests(app)
                .put("/user/0")
                .auth(token,{type:'bearer'})
                .send({"first_name": "modified",
                    "last_name": "controller",
                    "email": "test90@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(200);
        })
        test("Should not be able to modify user", async () => {
            await us.register("Test", "test", "test60@gmail.com", "test", "514-851-9013", false)
            const res = await requests(app)
                .put("/user/0")
                .auth(token,{type:'bearer'})
                .send({"first_name": "modified",
                    "last_name": "controller",
                    "email": "test60@gmail.com",
                    "password": "gas-123",
                    "phone": "514-093-9011"})
            expect(res.status).toBe(404);
            expect(res.body.mess).toBe("Email already exists");

        })
    })
})