import ChatMessage from "../ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ user, messages, endOfChat }) {
  return (
    <div className="chat-messages">
      {messages.map(message => <ChatMessage key={message.id} user={user} message={message} />)}
      <div className="end-of-chat" ref={endOfChat}></div>
    </div>
  )
}

export default ChatMessages;
