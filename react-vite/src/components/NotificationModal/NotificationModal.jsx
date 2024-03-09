import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import "./NotificationModal.css";

function NotificationModal({ message, status, secondaryModal = false, thirdLevelModal = false, setTimeOut = true, loader = true }) {
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
    if (setTimeOut) {
      const timer = setTimeout(() => {
        closeModalFn();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [closeModalFn, setTimeOut]);

  const messageWithNewLines = message.split("\n");

  return (
    <div id="notification">
      <h2 className="subheading">Notification</h2>
      <div className={status}>
        {messageWithNewLines.map((m, i) => <React.Fragment key={i}>
          {messageWithNewLines.length > 1 && <br />}
          <p>{m}</p>
        </React.Fragment>)}
      </div>
      {loader && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default NotificationModal;
