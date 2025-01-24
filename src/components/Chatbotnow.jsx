import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import qr from '../images/qr.png';
import Logo from '../images/Logo.png';

const ChatWithBotpress = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const welcome = [
    'Hi Alfy, give me some information of your invoice',
    'Hello Alfy, can you provide some details about your invoice?',
    'Hi Alfy, could you share the details of your invoice with me?',
    'Hello Alfy, can you provide some information about your invoice?',
    'Hello Alfy, could you kindly share the details of your invoice, such as the number, product name, email, quantity and price',
    'Hello Alfy, would you mind providing the invoice details, like the number or issue date? Thank you!'
  ];
  const randomNumber = Math.floor(Math.random() * 6); // Generates a random number between 0 and 4
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
      setConversation(prev => [...prev, { type: 'bot', text: '...typing' }]);
      const response = await axios.get('https://tuaneka-igba.onrender.com/messaging/listen');
      const botMessage = response.data.payload.text || 'No response received.';
      setConversation(prev => [...prev.slice(0, -1), { type: 'bot', text: botMessage }]);
    } catch (error) {
      setConversation(prev => [...prev, { type: 'bot', text: 'Error receiving response from the bot.' }]);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',  // Smooth scrolling
      });
    }
  }, [conversation]);

  return (
    <main className="mt-4 md:mt-0 ml-9 mr-9 grid grid-cols-5 gap-4">
      {/* Chat Interface */}
      <div className="col-span-3">
        <h6 className='text-left'>Hello Alfy, Welcome to Tuaneka. How can we help you today?</h6>
        <div className="flex gap-2 mt-3">
          <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I need a new invoice</button>
        </div>
        <div className="mt-3">
        <div className="flex justify-start items-center gap-1">
                    <img className='w-20 h-9' src={Logo} alt="Logo" />
                    <div className="text-black p-2 px-4 rounded-md text-left text-sm">{welcome[randomNumber]}</div>
                  </div>
          <div className="" ref={chatWindowRef}>
            {conversation.map((message, index) => (
              <div key={index} className="mb-3">
                {message.type === 'user' ? (
                  <div className="pl-24">
                    <div className="bg-pink-600 text-white p-1 px-5 rounded-xl text-sm max-w-xs mt-3">{message.text}</div>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-1">
                    <img className='w-20 h-9' src={Logo} alt="Logo" />
                    <div className="text-black p-2 px-4 rounded-md max-w-lg text-left">{message.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex pl-24">
          {loading? 
            <div className="text-center text-sm ml-16 text-gray-500">Loading...</div> :
          
        <input
                                className='rounded-xl px-5 focus:border-none outline-none bg-pink-600 w-72 p-1 text-white text-sm'
                                type="text"
                                placeholder='Enter message here...'
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessageToBot()}
                                       />
          }
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="col-span-2">
        <div className="invoice-preview border-2 p-4 rounded-lg">
          <div className="flex justify-between mb-6">
            <h6 className="text-sm text-left">This is a preview of your invoice</h6>
            <h6 className="text-sm text-right">
              <span className="text-pink-600">Click here to send</span> this invoice
            </h6>
          </div>
          <div className="flex justify-between mb-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold">Invoice</h3>
              <p className="text-sm">TEAMALFY WEB SERVICES</p>
              <p className="text-xs">Unit fo2</p>
              <p className="text-xs">Admin@teamalfy +64 123 1234 123</p>
            </div>
            <div className="text-right">
              <h5 className="font-semibold text-sm">Invoice Number: INV-0002</h5>
              <p className="text-xs">Invoice Date: 02 Jan 2023</p>
              <p className="text-xs">Payment Due: 20 Jan 2023</p>
              <p className="text-xs font-bold">Amount Due: USD 6,000.00</p>
            </div>
          </div>
          <table className="w-full text-xs mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Services</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
        
            </tbody>
          </table>
          <div className="mt-4 text-xs font-semibold">
            <hr className="bg-black mb-2" />
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>2122 USD</span>
            </div>
            <div className="flex justify-between">
              <span>Taxable Amount:</span>
              <span>222 USD</span>
            </div>
            <div className="flex justify-between">
              <span>VAT:</span>
              <span>222 USD</span>
            </div>
            <hr className="bg-black mb-2" />
            <div className="flex justify-between">
              <span className="font-bold">Amount Due:</span>
              <span className="font-bold">3332 USD</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs">
            <div className="text-left">
              <h1 className="text-pink-600">NOTES AND TERMS</h1>
              <p>TeamALfy Web Services</p>
              <p>FWST/J#WAN: N202530012</p>
              <p>Account number: 12-1234-123456-12</p>
              <p className="font-semibold mb-5">Please use INV-0002 as a reference number</p>
              <p>For any questions, please contact us at Admin@tuaneka.com</p>
            </div>
            <div className="text-left">
              <h6>Pay online</h6>
              <p>https://bay.strip.com</p>
              <img className="w-12" src={qr} alt="QR Code" />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default ChatWithBotpress;
