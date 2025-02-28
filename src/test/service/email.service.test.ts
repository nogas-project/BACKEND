import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from '@jest/globals';
import {EmailService as es} from "../../service/email.service";
import { AuthService as auth } from "../../service/auth.service";
import {UserService as us} from "../../service/user.service";
import {ContactService as cs} from "../../service/contact.service";
import {config} from "../../config/config"
let userId: number;
beforeEach(async () => {
    await us.deleteUser("0");
    const res = await auth.register("test", "test", "test3@gmail.com", "gas-123", "514-863-9090", false);
    userId = <number>res.mess;
    await cs.addContact("admin", config.GMAIL!, userId );
})
afterEach(async () => {
    await cs.deleteContact(0);
    await us.deleteUser("0");
})
describe("EmailService", () => {
    describe("Send Email to Contacts", () => {
        test("Should send the email to the contact", async () => {
            const res = await es.sendEmailToContact(userId)
            expect(res).toBe(true);
        }, 60000)
    })
    describe("Send Email to someone specific", () => {
        test("Should send the email", async () => {
            const res = await es.sendEmail(config.GMAIL!, "Test", "This is an email from the unit test -- email.service.test.ts");
            expect(res).toBe(true);
        }, 60000)
        test("Should not send the email", async () => {
            const res = await es.sendEmail(config.GMAIL!,"","");
            expect(res).toBe(false);
        }, 60000)
    })
})