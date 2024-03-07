import "./ChatMessage.css";

function ChatMessage({ message, myMsg }) {
  return (
    <div className={`chat-message ${myMsg ? "me" : ""}`}>{message}</div>
  );
}

export default ChatMessage;
