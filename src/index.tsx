import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";

const App = React.lazy(() => import("./App"));

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
     <Suspense fallback={<div>Loading...</div>}>
      <App />
     </Suspense>
    </PersistGate>
   </Provider>
  </React.StrictMode>
 );
}

reportWebVitals();
