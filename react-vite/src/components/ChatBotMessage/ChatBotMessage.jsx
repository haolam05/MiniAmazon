function ChatBotMessage({ message }) {
  return (
    <div className={`chat-message`}>
      <img src="/images/chabot-avatar.png" alt="chatbot-avatar" />
      <div className="message-parts">
        {message.split("\n").map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );
}

export default ChatBotMessage;
