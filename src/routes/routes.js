import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";



import NotFound from "../Notfound/Notfound";

import Login from'../Login/Login';
import VerifCompte from'../verifcompte/verifc';


export default function Routes() {
  let location = useLocation();
  return (
   
    <SwitchTransition>
      <CSSTransition
        key={location.key || false}
        timeout={800}
        classNames="fadeScale">
        <Switch location={location}>
          {/* User Routes*/}
          <Route exact path="/login">
          <Login/>
          </Route> 
          <Route  path="/verif/:id" component={VerifCompte}/>
          <Route   path="/"  />
          <Route   path="/admin"/>
          <Route   path="/employe"  />   
                                              
          <Route path="/404">
          <NotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </CSSTransition>
    </SwitchTransition>
   
  );
}