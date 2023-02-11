import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { FileProvider } from "./context/files";

ReactDOM.render(
  <BrowserRouter>
    <FileProvider>
      <AppRoutes />
    </FileProvider>
  </BrowserRouter>,
  document.getElementById("root")
);