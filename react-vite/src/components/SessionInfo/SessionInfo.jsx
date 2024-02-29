import { useDispatch } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "../ProfileButtons/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../redux/session";

function SessionInfo({ user }) {
  const dispatch = useDispatch();

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
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
