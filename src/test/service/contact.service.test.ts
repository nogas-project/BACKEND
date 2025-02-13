import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {ContactService as cs} from "../../service/contact.service";
beforeAll(async () => {
    await cs.deleteContact(0);
    await cs.deleteContact(1);
    await cs.deleteContact(2);
    await cs.addContact("A", "514-902-7863", 0);
})
afterAll(async () => {
    await cs.deleteContact(0);
    await cs.deleteContact(1);
    await cs.deleteContact(2);
})
describe("Contact Service", () => {
    describe("Get Emergencies contacts with the userID", () => {
        test("Should return a list of 1 contacts", async () => {
            const res = await cs.getContacts(0);
            expect(res?.length).toBe(1);
        })
        test("Should not return a list of contacts", async () => {
            const res = await cs.getContacts(90);
            expect(res).toBe(null);
        })
    })
    describe("Add new Emergencies contacts with the userID", () => {
        test("Should create a contact and return true", async () => {
            const res = await cs.addContact("A", "514-902-7861", 0);
            expect(res.flag).toBe(true);
        })
        test("Should not create a contact and return false", async () => {
            const res = await cs.addContact("A", "514-902-7861", 0);
            expect(res.flag).toBe(false);
            expect(res.mess).toBe("This phone number is already in use");
        })
    })
    describe("Update Emergencies contacts with the userID", () => {
        test("Should update a contact and return true", async () => {
            const res = await cs.modifyContact("B", "514-902-7865", 0, 0);
            expect(res.flag).toBe(true);
            expect(res.mess).toBe("Contact modified successfully");
        })
        test("Should not update the contact and return false", async () => {
            const res = await cs.modifyContact("B", "514-902-7865", 0, 1);
            expect(res.flag).toBe(false);
            expect(res.mess).toBe("This phone is already in use");
        })
        test("Should not found the contact to modified and return false", async () => {
            const res = await cs.modifyContact("B", "514-902-7865", 0, 2);
            expect(res.flag).toBe(false);
            expect(res.mess).toBe("Contact not found");
        })
    })
    describe("Delete emergencies contacts with his id", () => {
        test("Should delete a contact and return true", async () => {
            const res = await cs.deleteContact(0);
            expect(res).toBe(true);
        })
    })
})