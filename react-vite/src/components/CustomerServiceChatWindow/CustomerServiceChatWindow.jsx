import { useState } from "react";
import { closeChat, scrollToBottomOfChat } from "../../utils/chat";
import ChatMessages from "../ChatMessages";
import "./CustomerServiceChatWindow.css";

function CustomerServiceChatWindow({ user, socket, messages, setMessages }) {
  const [textInput, setTextInput] = useState("");

  const sendUserMessage = () => {
    if (textInput.length) {
      socket.emit("new_user_message", textInput);
      setMessages([...messages, { sender_id: user.id, text: textInput }]);
      setTextInput("");
      scrollToBottomOfChat();
    }
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13) { // enter
      e.preventDefault(); // prevent default new line
      if (e.ctrlKey) {
        setTextInput(textInput + "\n")
      } else {
        sendUserMessage();
      }
    }
  }

  return (
    <div id="customer-service-chat-window" className="hidden">
      <div className="chat-title">
        <div className="subheading">Customer Service</div>
      </div>
      <div className="close-chat-btn" title="Close chat" onClick={closeChat}>
        <i className="fa-solid fa-left-long"></i>
      </div>
      <div className="chat-body">
        <ChatMessages user={user} messages={messages} setMessages={setMessages} />
      </div>
      <div className="chat-footer">
        <textarea
          spellCheck={false}
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <i className="fa-solid fa-paper-plane" title="Send" onClick={sendUserMessage}></i>
      </div>
    </div>
  );
}

export default CustomerServiceChatWindow;
