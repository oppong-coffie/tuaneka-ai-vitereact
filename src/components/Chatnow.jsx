import React, { useState } from 'react';
import qr from '../images/qr.png';
import Logo from '../images/Logo.png';

const Chatnow = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ name: '', description: '', qty: '', price: '' });
    const [step, setStep] = useState(0);
    const [chatHistory, setChatHistory] = useState([]);
    const [askNewItem, setAskNewItem] = useState(false);
    const [thankYou, setThankYou] = useState(false);

    const questions = [
        'What is the name of the item?',
        'Give me some description of the item.',
        'What is the quantity of the item?',
        'What is the price of the item?',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        }
    };

    const handleNext = () => {
        if (askNewItem) {
            if (currentItem.name.toLowerCase() === 'yes') {
                setCurrentItem({ name: '', description: '', qty: '', price: '' });
                setStep(0);
                setAskNewItem(false);
            } else if (currentItem.name.toLowerCase() === 'no') {
                setThankYou(true);
                setAskNewItem(false);
            }
        } else if (step === questions.length - 1) {
            setItems([...items, currentItem]);
            setChatHistory([...chatHistory, { question: 'Do you want to add another item?', answer: '' }]);
            setCurrentItem({ name: '', description: '', qty: '', price: '' });
            setAskNewItem(true);
        } else {
            setChatHistory([...chatHistory, { question: questions[step], answer: currentItem[Object.keys(currentItem)[step]] }]);
            setStep(step + 1);
        }
    };
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

    return (
        <main className='mt-4 md:mt-0 ml-9 mr-9 grid grid-cols-5'>
            {/* chat area */}
            <div className="mt-1 col-span-3">
                <h6 className='text-left'>Hello Alfy, Welcome to Tuaneka. How can we help you today?</h6>
                <div className="flex gap-2 mt-7">
                    <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I need a new invoice</button>
                                        </div>

                <div className="chat-window p-4 rounded-lg">
                    {chatHistory.map((entry, index) => (
                        <div key={index} className="chat-message mb-3 bg-sla">
                            <div className="flex gap-3">
                                <img className='w-20 h-9' src={Logo} alt="Logo" />
                                <div className='w-[100%]'>
                                    <h6 className='text-left font-semibold'>{entry.question}</h6>
                                    {entry.answer && <p className='bg-pink-600 rounded-xl text-white mt-4 p-1 w-[70%] text-center px-3'>{entry.answer}</p>}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="chat-message mb-3">
                        <div className="flex gap-3">
                            <img className='w-20 h-9' src={Logo} alt="Logo" />
                            <h6 className='text-left'>
                                {thankYou ? 'Thank you for your inputs!' : askNewItem ? 'Do you want to add another item? (yes/no)' : questions[step]}
                                
                            </h6>
                            
                        </div>
                        {!thankYou && (
                            <input
                                className='rounded-lg focus:border-none outline-none bg-white w-full p-2 mt-2'
                                type="text"
                                placeholder={askNewItem ? 'Enter yes or no' : `Enter ${questions[step].toLowerCase()}`}
                                name={askNewItem ? 'name' : step === 0 ? 'name' : step === 1 ? 'description' : step === 2 ? 'qty' : 'price'}
                                value={askNewItem ? currentItem.name : step === 0 ? currentItem.name : step === 1 ? currentItem.description : step === 2 ? currentItem.qty : currentItem.price}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* preview */}
            <div className='col-span-2 mt-[-30px]'>
                <div className="invoice-preview mt-6">
                    <div className="flex justify-between">
                        <h6 className='text-left text-sm'>This is a preview of your invoice</h6>
                        <h6 className='text-right text-sm'><span className='text-pink-600'>Click here to send</span>  this invoice</h6>
                    </div>                    
                    <div className="border-2 p-2">
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
                        <table className="text-xs w-full">
                            <thead>
                                <tr className='bg-black text-white'>
                                    <th className='text-left pl-2'>Services</th>
                                    <th className='pl-7'>Quantity</th>
                                    <th className='pl-7'>Price</th>
                                    <th className='pl-7'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-left pt-2'>
                                            <h6 className='font-semibold'>{item.name}</h6>
                                            <h6>{item.description}</h6>
                                        </td>
                                        <td className='pl-7'>{item.qty}</td>
                                        <td className='pl-7'>{item.price}</td>
                                        <td className='pl-7'>{item.qty * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-xs font-semibold">
                            <hr className='bg-black p-[1px] m-1 mb-3' />
                            <h1 className='text-right'>Sub Total: {subtotal} USD</h1>
                            <div className="flex justify-end">
                                <hr className='bg-black p-[1px] w-56' />
                            </div>
                            <h1 className='text-right'>Taxable Amount: {subtotal} USD</h1>
                            <h1 className='text-right pt-3'>VAT: USD</h1>
                            <div className="flex justify-end">
                                <hr className='bg-black p-[1px] w-56' />
                            </div>               
                            <h1 className='text-right'>Amount Due: {subtotal} USD</h1>
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
            </div>
        </main>

    );
};

export default Chatnow;
