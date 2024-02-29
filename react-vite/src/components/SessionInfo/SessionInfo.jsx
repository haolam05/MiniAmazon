import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "../ProfileButtons/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../redux/session";
import NotificationModal from "../NotificationModal";

function SessionInfo({ user }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    setModalContent(<NotificationModal message="You have successfully logged out" />);
  }

  if (user) {
    return (
      <>
        <div id="user-greetings">
          <span>Hi {user.first_name} 😊</span>
          <span>{user.email}</span>
        </div>
        <div className="margin-right" onClick={logout}>Log Out</div>
      </>
    );
  }

  return (
    <>
      <div>
        <OpenModalMenuItem
          itemText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </div>
      <div className="margin-right">
        <OpenModalMenuItem
          itemText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </>
  );
}

export default SessionInfo;
