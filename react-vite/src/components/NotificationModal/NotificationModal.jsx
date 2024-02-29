import "./NotificationModal.css";

function NotificationModal({ message, status }) {
  return (
    <div id="notification">
      <h2 className="subheading">Notification</h2>
      <p className={status}>{message}</p>
    </div>
  );
}

export default NotificationModal;
