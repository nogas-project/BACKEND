import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {ContactService} from "../../service/contact.service";
const cs = new ContactService();
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
        test("Should return a list of 2 contacts", async () => {
            const res = await cs.getContacts(0);
            // @ts-ignore
            expect(res.length).toBe(1);
        })
        test("Should not return a list of contacts", async () => {
            const res = await cs.getContacts(90);
            expect(res).toBe(null);
        })
    })
    describe("Add new Emergencies contacts with the userID", () => {
        test("Should create a contact and return true", async () => {
            const res = await cs.addContact("A", "514-902-7861", 0);
            expect(res).toBe(true);
        })
        test("Should not create a contact and return false", async () => {
            const res = await cs.addContact("A", "514-902-7861", 0);
            expect(res).toBe(false);
        })
        test("Should not create a contact and return false", async () => {
            await cs.addContact("A", "514-908-8989", 0);
            const res = await cs.addContact("A", "514-902-7864", 0);
            expect(res).toBe(false);
        })
    })
    describe("Update Emergencies contacts with the userID", () => {
        test("Should update a contact and return true", async () => {
            const res = await cs.modifyContact("B", "514-902-7865", 0, 0);
            expect(res).toBe(true);
        })
        test("Should not update a contact and return false", async () => {
            const res = await cs.modifyContact("B", "514-902-7861", 0, 1);
            expect(res).toBe(false);
        })
    })
    describe("Delete emergencies contacts with his id", () => {
        test("Should delete a contact and return true", async () => {
            const res = await cs.deleteContact(0);
            expect(res).toBe(true);
        })
    })
})