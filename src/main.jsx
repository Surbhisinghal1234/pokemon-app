// import { render } from "preact";
import React from 'react';
// import "./index.css";
import ReactDOM from 'react-dom/client';

import Pokemon from "./Pokemon/Pokemon.jsx";

// render(<Pokemon />, document.getElementById("app"));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Pokemon />
  </React.StrictMode>
);
