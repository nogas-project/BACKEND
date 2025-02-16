import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import requests from "supertest";
import app, {server} from "../../index";
import {GasService as gs} from "../../service/gas.service";
import {UserService as us} from "../../service/user.service";
import {AuthService as auth} from "../../service/auth.service";
let token: string;
beforeAll(async () => {
    await gs.deleteData("0");
    await gs.deleteData("1");
    await gs.deleteData("2");
    await gs.addData(101);
    await gs.addData(108);
    await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", true);
    const res = await auth.login("test@gmail.com","gas-123");
    token = res.mess;
})
afterAll(async () => {
    await us.deleteUser("0");
    await gs.deleteData("0");
    await gs.deleteData("1");
    await gs.deleteData("2");
    server.close();
})

describe("GasController", () => {
    describe("Get latest info", () => {
        test("Get latest info", async () => {
            const res = await requests(app)
                .get("/latest/0")
                .auth(token,{type:'bearer'})
            expect(res.body?.co2_amount).toBe(108);
        })
    })
    describe("Get data history", () => {
        test("Should return the history", async () => {
            const res = await requests(app)
                .get("/history/0")
                .auth(token,{type:'bearer'})
            expect(res.body?.length).toBe(2);
        })
    })
    describe("Add data", () => {
        test("Should create the data and return true", async () => {
            const res = await requests(app)
                .post("/addData")
                .auth(token,{type:'bearer'})
                .send({ "co2_amount":108})
            expect(res.text).toBe(JSON.stringify("Data added successfully"));
        })
    })
})