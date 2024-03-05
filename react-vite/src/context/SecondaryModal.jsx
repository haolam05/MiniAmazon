import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './SecondaryModal.css';

const ModalContext = createContext();

export const useSecondaryModal = () => useContext(ModalContext);

export function SecondaryModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);

    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function SecondaryModal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="secondary-modal">
      <div id="secondary-modal-background" onClick={closeModal} />
      <div id="secondary-modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
