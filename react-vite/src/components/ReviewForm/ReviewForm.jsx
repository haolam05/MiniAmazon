import { useDispatch } from "react-redux";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import * as productActions from "../../redux/product";

function ReviewForm({ productId }) {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    disabledSubmitButton();


    enabledSubmitButton();
  }

  return (
    <></>
  );
}

export default ReviewForm;
