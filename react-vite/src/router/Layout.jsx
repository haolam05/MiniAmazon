import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { SecondaryModalProvider, SecondaryModal } from "../context/SecondaryModal";
import * as sessionActions from "../redux/session";
import { ThirdLevelModal, ThirdLevelModalProvider } from "../context/ThirdLevelModal";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      await dispatch(sessionActions.restoreSession());
      setIsLoaded(true);
    }
    restoreSession();
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <SecondaryModalProvider>
          <ThirdLevelModalProvider>
            {isLoaded && <Outlet />}
            <Modal />
            <SecondaryModal />
            <ThirdLevelModal />
          </ThirdLevelModalProvider>
        </SecondaryModalProvider>
      </ModalProvider>
    </>
  );
}
