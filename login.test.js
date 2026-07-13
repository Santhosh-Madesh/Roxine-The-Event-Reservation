const request = require("supertest")

const app = require("./app.js");
const { describe } = require("zod/v4/core");


describe("TESTING POST /login", ()=>{

    describe("when email and password is provided", ()=>{

        test("should return 201 created status code", async()=>{
            const payload = {
                email : "sirchris@gmail.com",
                password : "tenetisunderrated"
            }
            const response = (await request(app).post("/user/login").send(payload));

            expect(response.statusCode).toBe(200);
        })

    })

     describe("when email or password is not provided", ()=>{

        test("should return 400 status code", async()=>{
            const response = (await request(app).post("/user/login").send({}));

            except(response.statusCode).toBe(401);
        })
    })
})