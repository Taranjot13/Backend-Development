// const jest = require('jest');
const sum=jest.fn() //function mocking

// sum.mockReturnValue(5);
sum.mockReturnValueOnce(5);

test("addition of 2 and 3 is 5",()=>{
    expect(sum(4,5)).toBe(5);
})

sum.mockReturnValueOnce(9);
test("addition of 6 and 3 is 9",()=>{
    expect(sum(6,3)).toBe(9);
})
