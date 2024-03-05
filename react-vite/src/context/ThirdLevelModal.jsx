import { revealCart } from '../utils/cart';
import { useDispatch } from 'react-redux';
import { hideAddToCartBtn } from '../utils/product';
import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from '../components/ProductDetails';
import BookmarkForm from '../components/BookmarkForm';
import * as orderActions from "../redux/order";
import './ThirdLevelModal.css';

const ModalContext = createContext();

export const useThirdLevelModal = () => useContext(ModalContext);

export function ThirdLevelModalProvider({ children }) {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [modalContent, setThirdLevelModalContent] = useState(null);
  const [onModalClose, setOnThirdLevelModalClose] = useState(null);

  const closeThirdLevelModal = () => {
    setThirdLevelModalContent(null);

    if (typeof onModalClose === "function") {
      setOnThirdLevelModalClose(null);
      onModalClose();
    }
  };

  /************************************************/
  /********** Open Product details page **********/
  const createAndShowBookmarks = async (e, productId) => {
    e.stopPropagation();
    setThirdLevelModalContent(<BookmarkForm productId={productId} />);
  }

  const showCart = async (e, product) => {
    e.stopPropagation();
    await dispatch(orderActions.createOrderThunk(product));
    revealCart(e);
    hideAddToCartBtn(product.id);
  }

  const showProductDetails = (product, user, inCartProductIds, bookmarkProductIds) => {
    setThirdLevelModalContent(
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
    setThirdLevelModalContent,
    setOnThirdLevelModalClose,
    closeThirdLevelModal,
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

export function ThirdLevelModal() {
  const { modalRef, modalContent, closeThirdLevelModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="third-modal">
      <div id="third-modal-background" onClick={closeThirdLevelModal} />
      <div id="third-modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
