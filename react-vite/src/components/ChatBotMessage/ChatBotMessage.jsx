import React from "react";

function ChatBotMessage({ message }) {
  const messageWithNewLines = message.text.split("\n\n");

  return (
    <div className={`chat-message`} id={`message-${message.id}`}>
      <img src="/images/chabot-avatar.png" alt="chatbot-avatar" />
      <div className="message-parts">
        {messageWithNewLines.map((parts, i) => {
          return (
            <React.Fragment key={i}>
              {parts.split("\n").map((m, j) => <span key={j}>{m}</span>)}
              {messageWithNewLines.length > 1 && <br />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ChatBotMessage;
