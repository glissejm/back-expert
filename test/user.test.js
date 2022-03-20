import app from '../src/server';
import request from 'supertest';
import { User } from '../src/models/user.model';
import { connect, disconnect } from "../src/utils/db";

describe('USER controller', () => {
    beforeAll(async () => {
        await connect()
    })

    afterAll(async () => {
        await disconnect()
    })


    describe("GET /user", () => {
        test("Should have a Content-Type: application/json header for /user/:_id", async () => {

            const count = await User.count();
            const rand = Math.floor(Math.random() * count);
            const randomDoc = await User.findOne().skip(rand);
            const randomDocString = String(randomDoc['_id']);
            const response = await request(app).get("/user/"+randomDocString).send()
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
              );
        })
    })

    describe("PUT /user", () => {

        const infoToUpdate = {
            name: "Omar",
            email: "omarfttUpdated@getUserEmail.com",
            password: "passwordUpdated",
          };
      
        test("Should have a updated content for /user/:_id", async () => {

            const count = await User.count();
            const rand = Math.floor(Math.random() * count);
            const randomDoc = await User.findOne().skip(rand);
            const randomDocString = String(randomDoc['_id']);
            const response = await request(app).put("/user/"+randomDocString).send(infoToUpdate)

            const userUpdated = await User.findById(randomDocString);
            const nameUpdated = userUpdated['name']
            const emailUpdated = userUpdated['email']
            const passwordUpdated = userUpdated['password']
            expect(nameUpdated).toEqual("Omar");
            expect(emailUpdated).toEqual("omarfttUpdated@getUserEmail.com");
            expect(passwordUpdated).toEqual("passwordUpdated");
        })
    })

    describe("DELETE /user", () => {

      
        test("Should have a deleted content for /user/:_id", async () => {

            const count = await User.count();
            const rand = Math.floor(Math.random() * count);
            const randomDoc = await User.findOne().skip(rand);
            const randomDocString = String(randomDoc['_id']);
            const response = await request(app).delete("/user/"+randomDocString).send()
            const userUpdated = await User.findById(randomDocString);
            expect(userUpdated).toBeNull();
        })
    })

    

})

