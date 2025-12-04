const mongoose =require("mongoose");
let {MongoMemoryServer}=require("mongodb-memory-server");
let User=require("./model/user.model");
const request=require("supertest")
const app=require("./server");
let mongoServer;
beforeAll(async ()=>{
    mongoServer=await MongoMemoryServer.create();
    let url=mongoServer.getUri();
    await mongoose.connect(url);
})
afterEach(async ()=>{
    await User.deleteMany({});
})
afterAll(async ()=>{
    await mongoose.disconnect();
    await mongoServer.stop();
})

describe("POST /api/users/register", ()=>{

    it("should return user if email is 65taranjot@gmail.com",async()=>{
        await User.create({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"1234"
        })
        let response=await request(app).post("/api/users/register").send({
            name:"Taran",
            email:"65taranjot@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("User already exists") 

    })

    it("should create a new user with email taran@gmail.com",async()=>{
        let response=await request(app).post("/api/users/register").send({
            name:"sfs",
            email:"taran@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("User registered successfully!!") ;

    })
    
})