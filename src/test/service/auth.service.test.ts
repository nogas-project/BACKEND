import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import {UserService as us} from "../../service/user.service";
import {MUser} from "../../model/user.model";
import {AuthService as auth} from "../../service/auth.service";

beforeEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
    await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", false);
})
afterEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
})
describe("Auth Service", () => {

    describe("Creating a new user", () => {
        test("Should create a new user and return true", async () => {
            const response = await auth.register("Jerry", "Tom", "JTom@gmail.com", "abc-123", "514-864-8090", false);
            expect(response.flag).toBe(true);
        });
        test("Should not create a new user and return false", async () => {
            await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", false);
            const response = await auth.register("Test", "test", "test@gmail.com", "test", "514-851-9013", false);
            expect(response.flag).toBe(false);
        });
    })
    describe("Login", ()=>{
        test("Should log the user in and return JWT", async () => {
            const response = await auth.login("test@gmail.com", "gas-123");
            expect(response.flag).toBe(true);

        })
        test("Should not log the user in and return invalid credentials", async () => {
            const response = await auth.login("test@gmail.com", "test");
            expect(response.mess).toBe("Invalid credentials");
        })
    })

})
