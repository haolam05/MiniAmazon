function MyMessage({ message, user }) {
  return (
    <div className={`chat-message me`}>
      <span>{message}</span>
      <img src={user.profile_image_url} alt="user-avatar" />
    </div>
  );
}

export default MyMessage;
