const User=require("./model/user.schema");
const request = require("supertest");
const app=require("./server");
jest.mock("./model/user.schema");

describe("POST /api/users/register",()=>{
    it("should return user exist if hr tey tor register with email which are already present in database",async()=>{
        User.findOne=jest.fn().mockResolvedValueOnce(true)
        let response=await request(app).post("/api/users/register").send({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"12345"
        })
        expect(response.body.message).toBe("User already exists")
    })
    it("should crrate new user with email 65taranjot@gmail.com",async()=>{
        User.findOne=jest.fn().mockResolvedValueOnce(false)
        User.create=jest.fn().mockResolvedValueOnce({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"12345"
        })
        let response=await request(app).post("/api/users/register").send({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"12345"
        })
        expect(response.body.message).toBe("User registered successfully!!")
        expect(response.body.data).toEqual({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"12345"
        })
})})
