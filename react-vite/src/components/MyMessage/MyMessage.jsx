import { getAvatarUrl } from "../../utils/navbar";

function MyMessage({ message, user }) {
  return (
    <div className={`chat-message me`} id={`message-${message.id}`}>
      <div className="message-parts">
        {message.text.split("\n").map((m, i) => <span key={i}>{m}</span>)}
      </div>
      <img src={getAvatarUrl(user.profile_image_url)} alt="user-avatar" />
    </div>
  );
}

export default MyMessage;
