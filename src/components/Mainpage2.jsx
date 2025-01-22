import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import Logo from '../images/Logo.png'
import qr from '../images/qr.png'

const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

    const invoices = [
        { id: '101', date: '2025-01-15', amount: '250.00 USD' },
        { id: '102', date: '2025-01-10', amount: '125.00 USD' },
        { id: '103', date: '2025-01-05', amount: '300.00 USD' }
    ];

    return (
        <>
   {/* Previous Invioce Modal */}
   <Modal
      title="Previous Invoices"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null} // Disable default footer to create a custom one
      className="rounded-lg shadow-lg p-6"
    >
    
        {/* Modal Body */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-sm font-bold text-pink-600 border-b">Invoice #</th>
                <th className="py-2 px-4 text-sm font-bold text-pink-600 border-b">Date</th>
                <th className="py-2 px-4 text-sm font-bold text-pink-600 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 text-sm text-gray-700 border-b">{invoice.id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700 border-b">{invoice.date}</td>
                  <td className="py-2 px-4 text-sm text-gray-700 border-b">{invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
    </Modal>

            <main className='mt-4 md:mt-0 ml-9 mr-9 grid grid-cols-5'>
                <div className="mt-1 col-span-3">
                    <h6 className='text-left'>Hello Alfy, Welcome to Tuaneka. How can we help you today?</h6>
                    <div className="flex gap-2 mt-7">
                        <Link to='/chat'>
                            <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I need a new invoice</button>
                        </Link>
                        <button onClick={showModal} className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I want to list my previous invoices</button>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex justify-between">
                        <h6 className='text-left text-sm'>This is a preview of your last invoice</h6>
                        <h6 className='text-right text-sm'><span className='text-pink-600'>Click here to resend</span>  the last invoice</h6>
                    </div>
                    <div className="border-2 p-2 blur-sm">
                        <div className="bg-black h-[100%] w-[100%]"></div>
                        <div className="flex justify-between mb-5">
                            <div className=""><img src={Logo} alt="" /></div>
                            <div className="text-right">
                                <h3 className='font-bold'>Invoice</h3>
                                <h3 className='text-sm font-bold'>TEAMALFY WEB SERVICES</h3>
                                <h3 className='text-sm'>Unit fo2</h3>
                                <h3 className='text-sm'>Admin@teamalfy +64 123 1234 123</h3>
                            </div>
                        </div>
                        <div className="text-xs flex justify-between">
                            <div className="text-left mb-3">
                                <h1>Bill to</h1>
                                <h1 className='font-bold'>John Smith</h1>
                                <h1>Smith interiors</h1>
                                <h1>+233 264647435</h1>
                                <h1>oldguy@mutual.com</h1>
                            </div>
                            <div className="">
                                <div>
                                    <span>Invoice Number:</span> INV-0002
                                </div>
                                <div>
                                    <span>Invoice Date:</span> 02 Jan 2023
                                </div>
                                <div>
                                    <span>Payment Due:</span> 20 Jan 2023
                                </div>
                                <div className='font-bold'>
                                    <span>Amount Due:</span> USD 6,000.00
                                </div>

                            </div>
                        </div>
                        <div className="text-xs">
                            <table>
                                <thead>
                                    <tr className='bg-black text-white'>
                                        <th className='text-left pl-2'>Services</th>
                                        <th className='pl-7'>Quantity</th>
                                        <th className='pl-7'>Price</th>
                                        <th className='pl-7'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-left'>
                                            <h6 className='font-semibold pt-2'>Inified concept design</h6>
                                            <h6>This is a description of the text above</h6>
                                        </td>
                                        <td className='pl-7'>2</td>
                                        <td className='pl-7'>234000</td>
                                        <td className='pl-7'>2340001052000</td>
                                    </tr>
                                    <tr>
                                        <td className='text-left pt-2'>
                                            <h6 className='font-semibold'>Inified concept design</h6>
                                            <h6>This is a description of the text above</h6>
                                        </td>
                                        <td className='pl-7'>2</td>
                                        <td className='pl-7'>234000</td>
                                        <td className='pl-7'>2340001052000</td>
                                    </tr>
                                    <tr>
                                        <td className='text-left pt-2'>
                                            <h6 className='font-semibold'>Inified concept design</h6>
                                            <h6>This is a description of the text above</h6>
                                        </td>
                                        <td className='pl-7'>2</td>
                                        <td className='pl-7'>234000</td>
                                        <td className='pl-7'>2340001052000</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="text-xs font-semibold">
                            <hr className='bg-black p-[1px] m-1 mb-3' />
                            <h1 className='text-right'>Sub Total: 3,172,00 USD</h1>
                            <div className="flex justify-end">
                                <hr className='bg-black p-[1px] w-56' />
                            </div>
                            <h1 className='text-right'>Taxable Amount: 3,172,00 USD</h1>
                            <h1 className='text-right pt-3'>VAT: USD</h1>
                            <div className="flex justify-end">
                                <hr className='bg-black p-[1px] w-56' />
                            </div>               
                            <h1 className='text-right'>Amount Due: 3,172,00 USD</h1>
                        </div>
                        <div className="flex justify-between mt-5 text-xs">
                            <div className="text-left">
                                <h1 className='text-pink-600'>NOTES AND TERMS</h1>
                                <h1>TeamALfy Web Services</h1>
                                <h1>FWST/J#WAN: N202530012</h1>
                                <h1>Account number: 12-1234-123456-12</h1>
                                <h1 className='font-semibold mb-5'>Please use INV-0002 as a reference number</h1>
                                <h1>For any questions please contact us at Admin"tuaneka.com</h1>
                            </div>
                            <div className="text-left mt-5">
                                <h6>Pay online</h6>
                                <h6>https://bay.strip.com</h6>
                                <img className='w-12' src={qr} alt="" />
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </>
    );
}

export default Main;
