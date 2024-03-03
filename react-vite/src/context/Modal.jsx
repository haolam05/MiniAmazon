import { revealCart } from '../utils/cart';
import { useDispatch } from 'react-redux';
import { hideAddToCartBtn } from '../utils/product';
import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from '../components/ProductDetails';
import LoginFormModal from '../components/LoginFormModal';
import BookmarkForm from '../components/BookmarkForm';
import * as orderActions from "../redux/order";
import * as bookmarkActions from "../redux/bookmark";
import './Modal.css';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);

    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  /************************************************/
  /********** Open Product details page **********/
  const createAndShowBookmarks = async (e, user) => {
    e.stopPropagation();
    if (!user) {
      return setModalContent(<LoginFormModal />);
    }
    setModalContent(<BookmarkForm />);
    // await dispatch();
  }

  const showCart = async (e, product, user) => {
    e.stopPropagation();
    if (!user) {
      return setModalContent(<LoginFormModal />);
    }
    await dispatch(orderActions.createOrderThunk(product));
    revealCart(e);
    hideAddToCartBtn(product.id);
  }

  const showProductDetails = (product, user, inCartProductIds, bookmarkProductIds) => {
    setModalContent(
      <ProductDetails
        product={product}
        createAndShowBookmarks={e => createAndShowBookmarks(e, user, product.id)}
        showCart={e => showCart(e, product, user)}
        inCartProductIds={inCartProductIds}
        bookmarkProductIds={bookmarkProductIds}
      />
    );
  }
  /************************************************/
  /************************************************/

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
    createAndShowBookmarks,
    showCart,
    showProductDetails
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

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
