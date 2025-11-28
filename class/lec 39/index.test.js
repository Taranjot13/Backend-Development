const request = require('supertest');
const app=require('./index');


describe("POST /sum",()=>{
    it('it should show addition of two number 1+2 will be 3',async()=>{
    let response = await request(app).post('/sum').send({
        a:1,
        b:2
    })
    expect(response.body.result).toBe(3)
})
it("should return invalid aguument if one of the parameter is not present or undefined ",async()=>{
    let response = await request(app).post('/sum').send({
        a:1
    })
    expect(response.body.result).toBe("invalid argument")
})
})