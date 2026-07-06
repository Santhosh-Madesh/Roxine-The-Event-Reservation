

const generateBill = (no_of_tickets, cost_per_ticket, tax, platform_fee, payment_status="not paid") =>{

    if(typeof(no_of_tickets) != "number" || typeof(cost_per_ticket) != "number" || typeof(tax) != "number" || typeof(platform_fee) != "number"){
        return undefined;
    }

    const total_fee = (no_of_tickets*cost_per_ticket) + tax + platform_fee;

    const billData = {
        no_of_tickets: no_of_tickets,
        cost_per_ticket : cost_per_ticket,
        tax: tax,
        platform_fee: platform_fee,
        total_fee : total_fee,
        payment_status: payment_status,
    }

    return billData;
}


module.exports = generateBill;