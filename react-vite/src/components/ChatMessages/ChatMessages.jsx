import ChatMessage from "../ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ user, messages }) {
  return (
    <div className="chat-messages">
      {messages.map(message => <ChatMessage key={message.id} user={user} message={message} />)}
    </div>
  )
}

export default ChatMessages;
