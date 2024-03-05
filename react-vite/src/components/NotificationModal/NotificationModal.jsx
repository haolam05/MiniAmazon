import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./NotificationModal.css";

function NotificationModal({ message, status }) {
  const { closeModal } = useModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="notification">
      <h2 className="subheading">Notification</h2>
      <p className={status}>{message}</p>
      <div className="loading">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default NotificationModal;
