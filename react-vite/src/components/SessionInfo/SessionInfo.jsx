import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAvatarUrl } from "../../utils/navbar";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "../ProfileButtons/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import NotificationModal from "../NotificationModal";
import UserProfile from "../UserProfile";
import * as sessionActions from "../../redux/session";

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
        <div id="avatar" onClick={() => setModalContent(<UserProfile user={user} />)} title="Your profile">
          <img src={getAvatarUrl(user.profile_image_url)} alt="avatar" />
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
