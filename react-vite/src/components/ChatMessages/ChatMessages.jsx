import ChatMessage from "../ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ messages, user }) {
  return (
    <div className="chat-messages">
      {/* {messages.map((message, i) => <ChatMessage key={i} message={message} />)} */}
      <ChatMessage user={user} message="Hello Nicky! ⭐" myMsg={false} />
      <ChatMessage user={user} message="Hello Hao! 🌹" myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello " myMsg={true} />
      <ChatMessage user={user} message="Hello " myMsg={false} />
      <ChatMessage user={user} message="Hello theree !!!" myMsg={true} />
      <ChatMessage user={user} message="Hello theree !!!" myMsg={true} />
    </div>
  )
}

export default ChatMessages;
