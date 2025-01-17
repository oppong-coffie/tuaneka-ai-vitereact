import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import frame129 from '../images/frame129.png'
import { Button, Card, Divider, Input } from "@nextui-org/react";
import ChatWithBotpress from './ChatWithBotpress';
import axios from 'axios';



const Invoice2 = () => {
  const location = useLocation();
  const { name, invoiceDetails, customer } = location.state || {};
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);


  const sendMessageToBot = async () => {
    if (!userInput.trim()) {
      setConversation(prev => [...prev, { type: 'bot', text: 'Please enter a valid message.' }]);
      return;
    }

    setConversation(prev => [...prev, { type: 'user', text: userInput }]);
    setUserInput('');
    setLoading(true);

    try {
      await axios.post('https://tuaneka-igba.onrender.com/messaging/send', { text: userInput });

      await getBotResponse();
    } catch (error) {
      setConversation(prev => [...prev, { type: 'bot', text: 'Error sending message.' }]);
    } finally {
      setLoading(false);
    }
  };

  const getBotResponse = async () => {
    try {
      const response = await axios.get('https://tuaneka-igba.onrender.com/messaging/listen');
      const botMessage = response.data.payload.text || 'No response received.';
      setConversation(prev => [...prev, { type: 'bot', text: botMessage }]);
    } catch (error) {
      setConversation(prev => [...prev, { type: 'bot', text: 'Error receiving response from the bot.' }]);
    }
  };
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversation]);

  const customers = [
    { id: 1, name: 'Potia Oppong', email: 'oppongcoffie27@gmail.com' },
    { id: 2, name: 'Stephen Oppong Coffie', email: 'oppongcoffie27@gmail.com' },
    { id: 3, name: 'Ata Ahenkorah', email: 'oppongcoffie27@gmail.com' },
    { id: 4, name: 'Abigail Oppong Coffie', email: 'oppongcoffie27@gmail.com' },
    { id: 5, name: 'Vincent Ahenkorah', email: 'oppongcoffie27@gmail.com' }
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
   
  };

  return (
    <main className='ml-9 mr-9'>
    <h2 className="text-2xl font-bold mb-6 text-left">Generate your invoice with AI</h2>
    <h3 className="text-left md:text-xl bg-slate-800 text-white p-2 md:p-4 rounded-3xl md:pl-12">
        Got it! You are sending invoice to: <br></br>
        {customer?.name}, with Email: {customer?.email}.<br></br>
        Provide name of item, give small description(optional) quantity and price
        </h3>

        <div className="text-left mt-4">
        <select
                name="customer"
                value={customer}
                onChange={handleChange}
                className="text-sm bg-slate-400 rounded-lg font-bold px-9 p-2"
              >
                <option className='bg-white mr-12' value="">Select a customer</option>
                {customers.map(customer => (
                  <option className='bg-white mr-12 font-semibold m-12' key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
        </div>

        <div className="flex bg-slate-300 p-6 rounded-lg my-1 justify-between">
          <div className="">
            <label htmlFor="" className='font-bold'>Item name</label> <br />
            <input type="text" placeholder='enter here' className='rounded text-center'/>
          </div>
          <div className="">
            <label htmlFor="" className='font-bold'>Description</label> <br />
            <input type="text" placeholder='enter here' className='rounded text-center'/>
          </div>
          <div className="">
            <label htmlFor="" className='font-bold'>Quantity</label> <br />
            <input type="text" placeholder='enter here' className='rounded text-center'/>
          </div>
          <div className="">
            <label htmlFor="" className='font-bold'>Price</label> <br />
            <input type="text" placeholder='enter here' className='rounded text-center'/>
          </div>
        </div>
       
        
        <div className="border border-gray-300 rounded-lg p-2 px-2">
        <div className="scrollable h-72 overflow-y-scroll" ref={chatWindowRef}>
          {conversation.map((message, index) => (
            <div key={index} className="mb-3">
              {message.type === 'user' ? (
                <div className="flex justify-end mb-0">
                  <div className="bg-blue-500 text-white p-2 px-2 rounded-md max-w-xs">{message.text}</div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-black p-2 rounded-md max-w-xs">{message.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && <div className="mt-3 text-left text-pink-600">Loading...</div>}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full p-3 border rounded-md"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessageToBot()}
        />
        <button onClick={sendMessageToBot} className="text-sm bg-pink-600 rounded-xl w-44 text-white py-2">
          Send
        </button>
      </div>
    
 
          <Divider />
    </main>
  );
};

export default Invoice2;
