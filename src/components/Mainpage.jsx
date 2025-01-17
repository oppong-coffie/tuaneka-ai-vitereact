import React, { useState } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
  const customers = [
    { id: 1, name: 'Potia Oppong', email: 'oppongcoffie27@gmail.com' },
    { id: 2, name: 'Stephen Oppong Coffie', email: 'oppongcoffie27@gmail.com' },
    { id: 3, name: 'Ata Ahenkorah', email: 'oppongcoffie27@gmail.com' },
    { id: 4, name: 'Abigail Oppong Coffie', email: 'oppongcoffie27@gmail.com' },
    { id: 5, name: 'Vincent Ahenkorah', email: 'oppongcoffie27@gmail.com' }
  ];

  const [formData, setFormData] = useState({ customer: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCustomer = customers.find(customer => customer.id === parseInt(formData.customer));
    navigate('/invoice2', { state: { customer: selectedCustomer } });
  };

  return (
    <>
      <main className='mt-4 md:mt-0 ml-9 mr-9 text-left'>
        <h2 className="text-2xl md:text-3xl font-bold md:mb-6 md:mt-3">Generate your invoice with AI</h2>
        <h3 className="text-xl font-semibold bg-slate-800 text-white p-4 rounded-xl w-3/4">
          Hello! Welcome to Tuaneka. Lets help you create an invoice. Could you tell me the name of the client this invoice is for?
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="md:h-[43vh] rounded-2xl p-3">
            <div className="flex space-x-7">
              <button type="button" className="text-sm bg-pink-600 rounded-lg text-white py-2 px-7">Add new customer</button>

              <select
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="text-sm bg-slate-400 rounded-lg font-bold px-9"
              >
                <option className='bg-white mr-12' value="">Select a customer</option>
                {customers.map(customer => (
                  <option className='bg-white mr-12 font-semibold m-12' key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
        
            <div className="text-sm text-white text-right mt-36">
              <button type="submit" className="rounded-lg w-44 p-2 text-center bg-pink-600">Continue</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default Main;
