import { closeChat } from "../../utils/chat";
import ChatMessages from "../ChatMessages";
import "./CustomerServiceChatWindow.css";

function CustomerServiceChatWindow({ user, messages }) {
  return (
    <div id="customer-service-chat-window" className="hidden">
      <div className="chat-title">
        <div className="subheading">Customer Service</div>
      </div>
      <div className="close-chat-btn" title="Close chat" onClick={closeChat}>
        <i className="fa-solid fa-left-long"></i>
      </div>
      <div className="chat-body">
        <ChatMessages user={user} messages={messages} />
      </div>
      <div className="chat-footer">
        <textarea spellCheck={false} />
        <i className="fa-solid fa-paper-plane" title="Send"></i>
      </div>
    </div>
  );
}

export default CustomerServiceChatWindow;
