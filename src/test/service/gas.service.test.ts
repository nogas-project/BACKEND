import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {GasService as gs} from "../../service/gas.service";

beforeAll(async () => {
    await gs.deleteData("0");
    await gs.deleteData("1");
    await gs.deleteData("2");
    await gs.addData(101);
    await gs.addData(108);
})
afterAll(async () => {
    await gs.deleteData("0");
    await gs.deleteData("1");
    await gs.deleteData("2");
})
describe("GasService", () => {
    describe("Get latest info", () => {
        test("Should return the latest info", async () => {
            const response = await gs.latestInfo();
            expect(response?.co2_amount).toBe(108);
        })
    })
    describe("Get data history", () => {
        test("Should return the history", async () => {
            const response = await gs.getHistory();
            expect(response?.length).toBe(2);
        })
    })
    describe("Add data", () => {
        test("Should create the data and return true", async () => {
            const res = await gs.addData(102);
            expect(res).toBe(true);
        })
    })
    describe("Delete data", () => {
        test("Should delete data with id and return true", async () => {
            const res = await gs.deleteData("2");
            expect(res).toBe(true);
        })
    })
})