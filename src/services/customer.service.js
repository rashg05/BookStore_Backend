import Customer from "../models/customer.model";

export const customerDetails = async (body) => {
    const data = await Customer.create(body);
    return data;
   };