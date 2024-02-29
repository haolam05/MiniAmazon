import { useModal } from '../../context/Modal';

// modalComponent : component to render inside the modal
// itemText       : text of the menu item that opens the modal
// onItemClick    : optional: callback function that will be called once the menu item that opens the modal is clicked
// onModalClose   : optional: callback function that will be called once the modal is closed
function OpenModalMenuItem({ modalComponent, itemText, onItemClick, onModalClose }) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <span onClick={onClick}>{itemText}</span>
  );
}

export default OpenModalMenuItem;
