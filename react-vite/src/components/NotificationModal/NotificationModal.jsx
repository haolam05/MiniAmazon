import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import "./NotificationModal.css";

function NotificationModal({ message, status, secondaryModal = false, thirdLevelModal = false }) {
  const { closeSecondaryModal } = useSecondaryModal();
  const { closeThirdLevelModal } = useThirdLevelModal();
  const { closeModal } = useModal();

  const getCloseModal = () => {
    if (thirdLevelModal) {
      return closeThirdLevelModal;
    } else if (secondaryModal) {
      return closeSecondaryModal;
    } else {
      return closeModal;
    }
  }

  const closeModalFn = getCloseModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModalFn();
    }, 4000);
    return () => clearTimeout(timer);
  }, [closeModalFn]);

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
