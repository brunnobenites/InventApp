import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./public/Login/Login";
import Settings from "./private/Settings/Settings";
import Inventarios from "./private/Inventarios/Inventarios";
import Arvores from "./private/Arvores/Arvores";
import SelectInventario from "./private/Inventarios/SelectInventario";

function Routes() {
  function PrivateRoute({ children, ...rest }) {
    console.log("Props em PrivateRoute:", rest); // Adicione este console.log
    return (
      <Route
        {...rest}
        render={() => {
          return localStorage.getItem("token") ? children : <Redirect to="/" />;
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Login />
      </Route>
      <PrivateRoute path="/settings">
        <Settings />
      </PrivateRoute>
      <PrivateRoute path="/inventarios/:id_inventario">
        <SelectInventario />
      </PrivateRoute>
      <PrivateRoute path="/inventarios">
        <Inventarios />
      </PrivateRoute>
      <Route path="/arvores">
        <Arvores />
      </Route>
    </BrowserRouter>
  );
}

export default Routes;
