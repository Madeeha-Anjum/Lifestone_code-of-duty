import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import WelcomeScreen from "./screens/WelcomeScreen";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TimelineScreen from "./screens/TimelineScreen";
import { Provider } from "react-redux";
import Persistor from "./store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={Persistor().store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={Persistor().persistor}>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/timeline" element={<TimelineScreen />} />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
