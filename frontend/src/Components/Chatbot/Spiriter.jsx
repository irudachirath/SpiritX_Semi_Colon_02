import React, { useState } from 'react';

const Spiriter = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate bot response
      setMessages([...messages, { text: 'This is a bot response.', sender: 'bot' }]);
      setInput('');
    }
  };

  return (
    <div className="spiriter-chatbot">
      <h2>Spiriter Chatbot</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Spiriter..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Spiriter;