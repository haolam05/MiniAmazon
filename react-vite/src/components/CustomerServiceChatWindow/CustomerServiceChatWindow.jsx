import { useEffect, useState } from "react";
import { closeChat, scrollToBottomOfChat, sendMessage } from "../../utils/chat";
import ChatMessages from "../ChatMessages";
import "./CustomerServiceChatWindow.css";

function CustomerServiceChatWindow({ user, socket }) {
  const [messages, setMessages] = useState([{ id: 0, sender_id: 0, text: "Hi there!! How can I help you today?" }]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const handleConnectionError = () => setTimeout(() => socket.connect(), 5000);
    const handleNewMessage = newMessages => {
      setMessages([...messages, ...newMessages]);
      scrollToBottomOfChat();
    };

    socket.on('connect_error', handleConnectionError);
    socket.on("new_robot_message", handleNewMessage);

    return () => {
      // socket.off('connect_error', handleConnectionError);
      // socket.off('new_robot_message', handleNewMessage);
    }
  }, [socket, messages]);

  const sendUserMessage = async () => {
    if (textInput.length) {
      const newMessage = { id: messages.length, sender_id: user.id, text: textInput };
      setTextInput("");
      await sendMessage(newMessage);
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
