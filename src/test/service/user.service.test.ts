import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import {UserService as us} from "../../service/user.service";
import {MUser} from "../../model/user.model";
import {AuthService as auth} from "../../service/auth.service";

beforeEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
    const res = await auth.register("test", "test", "test@gmail.com", "gas-123", "514-863-9090", false);
})
afterEach(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.deleteUser("2");
})
describe("User Service", () => {

describe("Find user by Email", () => {
    test("Should find a user by email and return the user", async () => {
        const response = await us.findUserByEmail("test@gmail.com");
        if (response instanceof MUser) {
            expect(response.first_name).toBe("test");
        }
    })
    test("Should not find a user by email and return false", async () => {
        const response = await us.findUserByEmail("JerryTom@gmail.com");
        expect(response).toBe(false);
    })
})

describe("Modify User", () => {
    test("Should modify user and return true ", async () => {
        const response = await us.modifyUser("rename","rename", "rename@gmail.com", "Test", "514-708-9013", 0);
        expect(response.flag).toBe(true);
    })
    test("Should not modify user and return false ", async () => {
        // using an email already used
        await auth.register("Test", "test", "test60@gmail.com", "test", "514-851-9013", false)
        const response = await us.modifyUser("rename","rename", "test60@gmail.com", "Test", "514-708-9013", 0);
        expect(response.mess).toBe("Email already exists");
    })
})
describe("delete User", () => {
    test("Should delete user and return true", async () => {
        const response = await us.deleteUser("0");
        expect(response).toBe(true);
    })
})
})
