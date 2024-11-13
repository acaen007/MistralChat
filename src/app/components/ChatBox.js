'use client';

import { useState } from 'react';
import styles from './ChatBox.module.css';
import TypingIndicator from './TypingIndicator';

const models = [
  { id: 'pixtral-12b-2409', name: 'Pixtral 12B' },
  { id: 'open-mistral-nemo', name: 'NEMO' },
];

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0].id);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const assistantReply = data.reply;

      const assistantMessage = { role: 'assistant', content: assistantReply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
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
          <div
            key={`${msg.role}-${idx}`}
            className={`${styles.message} ${styles[msg.role]}`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles['assistant']}`}>
            <TypingIndicator />
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
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
