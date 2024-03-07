import ChatBotMessage from "../ChatBotMessage";
import MyMessage from "../MyMessage/MyMessage";
import "./ChatMessage.css";

function ChatMessage({ message, myMsg, user }) {
  if (myMsg) {
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
