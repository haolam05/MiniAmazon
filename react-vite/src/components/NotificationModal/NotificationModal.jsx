import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import "./NotificationModal.css";

function NotificationModal({ message, status, secondaryModal = false, thirdLevelModal = false }) {
  const getCloseModal = () => {
    if (thirdLevelModal) {
      const { closeThirdLevelModal } = useThirdLevelModal();
      return closeThirdLevelModal;
    } else if (secondaryModal) {
      const { closeSecondaryModal } = useSecondaryModal();
      return closeSecondaryModal;
    } else {
      const { closeModal } = useModal();
      return closeModal;
    }
  }

  const closeModal = getCloseModal();

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
