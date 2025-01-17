import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWithBotpress = () => {
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

  return (
    <div className="container mx-auto mt-0 p-1">
      <h2 className="text-2xl font-bold mb-2">Chat with Botpress AI</h2>

      <div className="h-96 border border-gray-300 rounded-lg p-2 px-2">
        <div className="scrollable h-80 overflow-y-scroll" ref={chatWindowRef}>
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
        {loading && <div className="mt-3">Loading...</div>}
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
    </div>
  );
};

export default ChatWithBotpress;
