function ChatBotMessage({ message }) {
  return (
    <div className={`chat-message`}>
      <img src="/images/chabot-avatar.png" alt="chatbot-avatar" />
      <span>{message}</span>
    </div>
  );
}

export default ChatBotMessage;
