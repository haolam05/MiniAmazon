import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../redux/session";

function ProfileButtons({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButtons;
