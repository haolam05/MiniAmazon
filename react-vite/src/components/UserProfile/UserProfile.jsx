import { useDispatch } from "react-redux";
import { getAvatarUrl } from "../../utils/navbar";
import { useModal } from "../../context/Modal";
import ConfirmDeleteFormModal from "../ConfirmDeleteModal";
import UpdatePasswordFormModal from "../UpdatePasswordFormModal";
// import UpdateUserFormModal from "../UpdateUserFormModal";
import NotificationModal from "../NotificationModal";
import * as sessionActions from "../../redux/session";
import "./UserProfile.css";

function UserProfile({ user }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  if (!user) return;

  const openUpdateUserForm = () => {
    // setModalContent(<UpdateUserFormModal user={user} />);
  }

  const openUpdatePasswordForm = () => {
    setModalContent(<UpdatePasswordFormModal user={user} />);
  }

  const openDeleteUserForm = () => {
    setModalContent(
      <ConfirmDeleteFormModal
        user={user}
        text="Are you sure you want to cancel your account?"
        deleteCb={deleteUser}
        cancelDeleteCb={closeModal}
      />);
  }

  const deleteUser = async () => {
    dispatch(sessionActions.deleteUserThunk());
    setModalContent(
      <NotificationModal
        message="Account is deleted successfully"
        status="alert-success"
      />
    );
  }

  return (
    <div id="user-profile-container">
      <h2 className="subheading">User Profile</h2>
      <div id="user-profile">
        <div className="profile-avatar">
          <img className="user-profile-avatar" src={getAvatarUrl(user.profile_image_url)} alt="avatar" />
        </div>
        <div className="profile-content">
          <div className="profile-titles">
            <div>First name</div>
            <div>Last name</div>
            <div>Username</div>
            <div>Email</div>
          </div>
          <div className="profile-details">
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
      <div className="profile-btns">
        <button className="btn-update" onClick={openUpdateUserForm}>Update</button>
        <button className="btn-delete" onClick={openUpdatePasswordForm}>Change Password</button>
        <button className="btn-delete" onClick={openDeleteUserForm}>Delete</button>
      </div>
    </div>
  );
}

export default UserProfile;
