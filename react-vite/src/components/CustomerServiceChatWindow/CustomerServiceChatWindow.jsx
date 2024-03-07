import { closeChat } from "../../utils/chat";
import ChatMessages from "../ChatMessages/ChatMessages";
import "./CustomerServiceChatWindow.css";

function CustomerServiceChatWindow() {
  return (
    <div id="customer-service-chat-window" className="hidden">
      <div className="chat-title">
        <h2 className="subheading">
          <div className="subheading">Customer Service</div>
        </h2>
        <div className="close-chat-btn" title="Close chat" onClick={closeChat}>
          <i className="fa-solid fa-left-long"></i>
        </div>
      </div>
      <div className="chat-body">
        <ChatMessages messages={[]} />
      </div>
      <div className="chat-footer">
        <textarea spellCheck={false} />
        <i className="fa-solid fa-paper-plane" title="Send"></i>
      </div>
    </div>
  );
}

export default CustomerServiceChatWindow;
