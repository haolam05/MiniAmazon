import { revealCart } from '../utils/cart';
import { useDispatch } from 'react-redux';
import { hideAddToCartBtn } from '../utils/product';
import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from '../components/ProductDetails';
import BookmarkForm from '../components/BookmarkForm';
import * as orderActions from "../redux/order";
import './SecondaryModal.css';

const ModalContext = createContext();

export const useSecondaryModal = () => useContext(ModalContext);

export function SecondaryModalProvider({ children }) {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [modalContent, setSecondaryModalContent] = useState(null);
  const [onModalClose, setOnSecondaryModalClose] = useState(null);

  const closeSecondaryModal = () => {
    setSecondaryModalContent(null);

    if (typeof onModalClose === "function") {
      setOnSecondaryModalClose(null);
      onModalClose();
    }
  };

  /************************************************/
  /********** Open Product details page **********/
  const createAndShowBookmarks = async (e, productId) => {
    e.stopPropagation();
    setSecondaryModalContent(<BookmarkForm productId={productId} />);
  }

  const showCart = async (e, product) => {
    e.stopPropagation();
    await dispatch(orderActions.createOrderThunk(product));
    revealCart(e);
    hideAddToCartBtn(product.id);
  }

  const showProductDetails = (product, user, inCartProductIds, bookmarkProductIds) => {
    setSecondaryModalContent(
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
    setSecondaryModalContent,
    setOnSecondaryModalClose,
    closeSecondaryModal,
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

export function SecondaryModal() {
  const { modalRef, modalContent, closeSecondaryModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="secondary-modal">
      <div id="secondary-modal-background" onClick={closeSecondaryModal} />
      <div id="secondary-modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
