const sum = require('./sum'); 


test('addition of two number 1+2 will be 3',()=>{
    expect(sum(1,2)).toBe(3);
    expect (sum(2,3)).toBe(5);
});

test("all argumest must be passed",()=>{
    expect(sum()).toBe("invalid argument");
})