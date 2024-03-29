import ChatBotMessage from "../ChatBotMessage";
import MyMessage from "../MyMessage/MyMessage";
import "./ChatMessage.css";

function ChatMessage({ user, message }) {
  if (user.id === message.sender_id) {
    return (
      <MyMessage
        message={message}
        user={user}
      />
    );
  } else {
    return (
      <ChatBotMessage
        message={message}
      />
    );
  }
}

export default ChatMessage;
