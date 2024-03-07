function MyMessage({ message, user }) {
  return (
    <div className={`chat-message me`}>
      <div className="message-parts">
        {message.split("\n").map((m, i) => <span key={i}>{m}</span>)}
      </div>
      <img src={user.profile_image_url} alt="user-avatar" />
    </div>
  );
}

export default MyMessage;
