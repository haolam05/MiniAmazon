import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./redux/store";
import * as sessionActions from "./redux/session";
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
