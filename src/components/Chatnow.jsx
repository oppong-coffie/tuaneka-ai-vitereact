import React, { useState } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';

const Chatnow = () => {
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
      <main className='mt-4 md:mt-0 ml-9 mr-9 flex justify-between'>
        <div className="">
            <div className="flex gap-2">
             
                <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I need a new invoice</button>
               
            </div>
    
        </div>
        <div className="">
            <div className="flex justify-between">
                <h6>This is a preview of your last invoice</h6>
                <h6>Click here to resend the last invoice</h6>
            </div>
            <div className="border-2">
                <div className="flex justify-between">
                    <div className="">T</div>
                    <div className="">
                        <h3>Invoice</h3>
                        <h3>TEAMALFY WEB SERVICES</h3>
                        <h3>Unit fo2</h3>
                        <h3>Admin@teamalfy +64 123 1234 123</h3>
                    </div>
                </div>
                <div className="">
                    <table>
                        <thead>
                            <tr>
                                <th>Services</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h6>Inified concept design</h6>
                                    <h6>This is a description of the text above</h6>
                                </td>
                                <td>2</td>
                                <td>234000</td>
                                <td>2340001052000</td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Inified concept design</h6>
                                    <h6>This is a description of the text above</h6>
                                </td>
                                <td>2</td>
                                <td>234000</td>
                                <td>2340001052000</td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Inified concept design</h6>
                                    <h6>This is a description of the text above</h6>
                                </td>
                                <td>2</td>
                                <td>234000</td>
                                <td>2340001052000</td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Inified concept design</h6>
                                    <h6>This is a description of the text above</h6>
                                </td>
                                <td>2</td>
                                <td>234000</td>
                                <td>2340001052000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div className="">
                <hr className='bg-black p-1' />
                <h1 className='text-right'>Sub Total: 3,172,00 USD</h1>
                <hr className='bg-black p-1' />
                <h1 className='text-right'>Taxable Amount: 3,172,00 USD</h1>
                <h1 className='text-right'>VAT: USD</h1>
                <hr className='bg-black p-1' />
                <h1 className='text-right'>Amount Due: 3,172,00 USD</h1>
                <h1 className='text-right'>VAT: USD</h1>
            </div>
            <div className="flex justify-between">
                <div className="">
                    <h1>NOTES AND TERMS</h1>
                    <h1>TeamALfy Web Services</h1>
                    <h1>FWST/J#WAN: N202530012</h1>
                    <h1>Account number: 12-1234-123456-12</h1>
                    <h1>For any questions please contact us at Admin"tuaneka.com</h1>
                </div>
                <div className="">
                    <h6>Pay online</h6>
                    <h6>https://bay.strip.com</h6>
                    image
                </div>
            </div>
            </div>
                
        </div>
 
      </main>
    </>
  );
}

export default Chatnow;
