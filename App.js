import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./screens/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
