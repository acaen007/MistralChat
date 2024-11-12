// src/app/components/ChatBox.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.css';

// Add at the top, after imports
const models = [
  { id: 'pixtral-12b-2409', name: 'Pixtral 12B' },
  { id: 'another-model-id', name: 'Another Model' },
  // Add more models as needed
];


const ChatBox = () => {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0].id);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/mistral', {
        messages: newMessages,
        model: selectedModel,
      });
      const assistantReply = response.data.reply;

      const assistantMessage = { role: 'assistant', content: assistantReply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['chat-container']}>
      <div className={styles['model-selection']}>
        <label htmlFor="model-select">Select Model: </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['chat-window']}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
            <span>{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles['assistant']}`}>
            <span>Typing...</span>
          </div>
        )}
      </div>
      <div className={styles['input-area']}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
