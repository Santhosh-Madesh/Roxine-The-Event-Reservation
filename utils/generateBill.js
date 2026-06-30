

const generateBill = (no_of_tickets, cost_per_ticket, tax, platform_fee) =>{

    const total_fee = (no_of_tickets*cost_per_ticket) + tax + platform_fee;

    const billData = {
        no_of_tickets: no_of_tickets,
        cost_per_ticket : cost_per_ticket,
        tax: tax,
        platform_fee: platform_fee,
        total_fee : total_fee,
        payment_status: "not paid"
    }

    return billData;
}


module.exports = generateBill;