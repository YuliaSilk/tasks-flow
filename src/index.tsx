import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
// import {BoardProvider} from "./components/Board/BoardContext";

const rootElement = document.getElementById("root");

if (rootElement) {
 const root = ReactDOM.createRoot(rootElement);
 root.render(
  <React.StrictMode>
   {/* <BoardProvider> */}
   <Provider store={store}>
    <PersistGate
     loading={null}
     persistor={persistor}
    >
     <App />
    </PersistGate>
   </Provider>
   {/* </BoardProvider> */}
  </React.StrictMode>
 );
}

reportWebVitals();
