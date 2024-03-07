import { closeChat } from "../../utils/chat";
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
    </div>
  );
}

export default CustomerServiceChatWindow;
