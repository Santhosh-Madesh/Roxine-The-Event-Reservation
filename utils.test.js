const generateBill = require("./utils/generateBill");


test("should return undefined when no of tickets is a string", ()=>{
    expect(generateBill("hello", 200, 100, 100)).toBe(undefined);
})


test("should return undefined when cost is not a number", ()=>{
    expect(generateBill(100, "hello", 200, 239)).toBe(undefined);
})

test("should return undefined when tax is not a number", ()=>{
    expect(generateBill(100, 10, "hello", 239)).toBe(undefined);
})

test("should return undefined when platform fee is not a number", ()=>{
    expect(generateBill(100, 10, 200, "hello")).toBe(undefined);
})

test("should return an appropriate object", ()=>{
    const billObj = {
        no_of_tickets: 10,
        cost_per_ticket : 200,
        tax: 300,
        platform_fee: 400,
        total_fee : 2700,
        payment_status:"not paid"
    }
    expect(generateBill(10, 200, 300, 400)).toEqual(billObj);
})

test("should not return undefined when the inputs are of valid type", ()=>{
    expect(generateBill(10, 100, 20, 30)).not.toBe(undefined);
})

test("should return undefined when not enough mandatory argument values are provided", ()=>{
    expect(generateBill(200, 10, 10)).toBe(undefined);
})


test("should return undefined when no argument is given at all", ()=>{
    expect(generateBill()).toBe(undefined);
})

test("should return undefined when payment status is neither not paid nor paid", ()=>{
    expect(generateBill(10, 100, 20, 30, "hola comosta")).toBe(undefined);
})

