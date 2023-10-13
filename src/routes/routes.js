import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import NotFound from "../Notfound/Notfound";

import Login from "../Login/Login";
import VerifCompte from "../verifcompte/verifc";

export default function RoutesApp() {
  let location = useLocation();
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key || false}
        timeout={800}
        classNames="fadeScale"
      >
        <Routes location={location}>
          {/* User Routes*/}
          <Route exact path="/login">
            <div>hi</div>
          </Route>
          <Route path="/verif/:id" component={VerifCompte} />
          <Route path="/" />
          <Route path="/admin" />
          <Route path="/employe" />

          <Route path="/404">
            <NotFound />
          </Route>
          <Navigate to="/404" />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}
