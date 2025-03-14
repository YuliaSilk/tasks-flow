import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme";

const rootElement = document.getElementById("root");

if (rootElement) {
 const root = ReactDOM.createRoot(rootElement);
 root.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate
     loading={null}
     persistor={persistor}
    >
     <ThemeProvider theme={theme}>
      <App />
     </ThemeProvider>
    </PersistGate>
   </Provider>
  </React.StrictMode>
 );
}

reportWebVitals();
