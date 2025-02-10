import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {UserService as us} from "../../service/user.service";
import {MUser} from "../../model/user.model";
import {decodeJwt} from "firebase-admin/lib/utils/jwt";
import jwt from "jsonwebtoken";
import {config} from "../../config/config";
// DONT FORGET TO CHANGE ENV FILE
beforeAll(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
    await us.register("Test", "test", "test@gmail.com", "test", "514-851-9013", false);
})
afterAll(async () => {
    await us.deleteUser("0");
    await us.deleteUser("1");
})
describe("User Service", () => {
describe("Creating a new user", () => {
    test("Should create a new user and return true", async () => {
        const response = await us.register("Jerry", "Tom", "JTom@gmail.com", "abc-123", "514-864-8090", false);
        expect(response.flag).toBe(true);
    });
    test("Should not create a new user and return false", async () => {
        const response = await us.register("Jerry", "Tom", "JTom@gmail.com", "abc-123", "514-864-8090", false);
        expect(response.flag).toBe(false);
    });
})
describe("Find user by Email", () => {
    test("Should find a user by email and return the user", async () => {
        const response = await us.findUserByEmail("JTom@gmail.com");
        if (response instanceof MUser) {
            expect(response.first_name).toBe("Jerry");
        }
    })
    test("Should not find a user by email and return false", async () => {
        const response = await us.findUserByEmail("JerryTom@gmail.com");
        expect(response).toBe(false);
    })
})
describe("Login", ()=>{
    test("Should log the user in and return JWT", async () => {
        const response = await us.login("test@gmail.com", "test");
        const payload = jwt.verify(response.mess, config.JWT_SECRET);
        // @ts-ignore
        expect(payload.id).toBe("0");
    })
    test("Should not log the user in and return invalid credentials", async () => {
        const response = await us.login("test2@gmail.com", "test");
        expect(response.mess).toBe("Invalid credentials");
    })
})
describe("Modify User", () => {
    test("Should modify an existing user and return true ", async () => {
        const response = await us.modifyUser("rename","rename", "rename@gmail.com", "Test", "514-708-9013", 0);
        console.log(response);
    })
    test("Should modify an existing user and return false ", async () => {
        // using an email already used
        const response = await us.modifyUser("rename","rename", "JTom@gmail.com", "Test", "514-708-9013", 0);
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