import app from '../src/server';
import request from 'supertest';
import { Question } from '../src/models/question.model';
import { connect, disconnect } from "../src/utils/db";

describe('DASHBOARD controller', () => {
    beforeAll(async () => {
        await connect()
    })

    afterAll(async () => {
        await disconnect()
    })

    describe("GET /dashboard", () => {
        test("Should have a Content-Type: application/json header for /dashboard", async () => {
            const response = await request(app).get("/dashboard").send()
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
              );
        })
        test("Should have a Content-Type: application/json header for /dashboard?difficult=Easy", async () => {
            const response = await request(app).get("/dashboard?difficult=Easy").send()
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
              );
        })
        test("Should have a Content-Type: application/json header for /dashboard/:_id", async () => {
            const count = await Question.count();
            const rand = Math.floor(Math.random() * count);
            const randomDoc = await Question.findOne().skip(rand);
            const randomDocString = String(randomDoc['_id']);

            const response = await request(app).get("/dashboard/"+randomDocString).send()
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
              );
        })

    })

})

