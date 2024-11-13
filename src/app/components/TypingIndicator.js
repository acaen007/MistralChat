// src/app/components/TypingIndicator.js
import styles from './TypingIndicator.module.css';

const TypingIndicator = () => {
  return (
    <div className={styles['typing-indicator']}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default TypingIndicator;
