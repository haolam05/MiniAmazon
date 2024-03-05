import { revealCart } from '../utils/cart';
import { useDispatch } from 'react-redux';
import { hideAddToCartBtn } from '../utils/product';
import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from '../components/ProductDetails';
import BookmarkForm from '../components/BookmarkForm';
import * as orderActions from "../redux/order";
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
  const createAndShowBookmarks = async (e, productId) => {
    e.stopPropagation();
    setModalContent(<BookmarkForm productId={productId} />);
  }

  const showCart = async (e, product) => {
    e.stopPropagation();
    await dispatch(orderActions.createOrderThunk(product));
    revealCart(e);
    hideAddToCartBtn(product.id);
  }

  const showProductDetails = (product, user, inCartProductIds, bookmarkProductIds) => {
    setModalContent(
      <ProductDetails
        user={user}
        product={product}
        createAndShowBookmarks={e => createAndShowBookmarks(e, product.id)}
        showCart={e => showCart(e, product)}
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
