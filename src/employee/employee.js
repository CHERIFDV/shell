import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Listereservation from "./listereservation/listevoitureres";
import Menu1 from "./menu/menu";
import Listeor from "./gtacheor/listeor";
import Listeorup from "./update/listeor";
import Listev from "./update/listev";
import Listetach from "./gtacheor/listetache";
import NotFound from "../Notfound/Notfound";
import Login from "./Login/Login";
import Rp from "./Login/restarpassword";
import Registeremp from "./Register/Register";
import Controletache from "./gtacheor/controletache";
import Terror from "./gtacheor/tacheerrore";
import Tachff from "./gtacheor/listetacheaff";
import Reparationdetache from "./gtacheor/reparationtache";
import Addvoirure from "./addvoiture/addvoiture";
import Registerclient from "./addvoiture/client";
import Tache from "./addvoiture/tache";

import Listeclient from "./addvoiture/listeclient";
import ORvoiture from "./addvoiture/orvoiture";
import Photo_or from "./addvoiture/photo";
import Upv from "./update/updatevoiture";
import Upor from "./update/updateorvoiture";
import Tacheup from "./update/tache";
import { Layout } from "antd";
import "./employee.scss";
const { Content, Footer, Sider } = Layout;
const Employee = () => {
  const emp = JSON.parse(localStorage.getItem("emp"));
  let location = useLocation();

  return (
    <div className="navbara navbarc">
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{}}>
          <Routes location={location}>
            <Route path="/employe/loginem" element={<Login/>} />
            <Route exact path="/employe/register" element={<Registeremp/>} />

            <Route exact path="/employe/tache" element={<Tache/>} />
            <Route exact path="/employe/" element={<Menu1/>} />

            <Route exact path="/employe/restarpassword/:id" element={<Rp/>} />

            {emp ? (
              emp.role == 1 ? (
                <>
                  <Route exact path="/employe/listetach" element={<Listetach/>} />
                  <Route exact path="/employe/listetachemp" element={<Tachff/>} />
                </>
              ) : emp.role == 3 ? (
                <>
                  <Route
                    exact
                    path="/employe/controltache"
                    element={<Controletache/>}
                  />
                  <Route exact path="/employe/tacheserror" element={Terror} />
                  <Route
                    exact
                    path="/employe/Reparationdetache"
                    element={<Reparationdetache/>}
                  />
                  <Route exact path="/employe/listeor" element={<Listeor/>} />
                </>
              ) : emp.role == 2 ? (
                <>
                  <Route exact path="/employe/OR" element={<Registerclient/>} />
                  <Route
                    exact
                    path="/employe/reservation"
                    element={<Listereservation/>}
                  />
                  <Route
                    exact
                    path="/employe/listeclient"
                    element={<Listeclient/>}
                  />
                  <Route
                    exact
                    path="/employe/addvoiture"
                    element={<Addvoirure/>}
                  />
                  <Route exact path="/employe/ORvoiture" element={<ORvoiture/>} />
                  <Route exact path="/employe/Photo" element={<Photo_or/>} />
                  <Route
                    exact
                    path="/employe/updatevoiture/:id"
                    element={Upv}
                  />
                  <Route exact path="/employe/listeor" element={<Listeorup/>} />
                  <Route exact path="/employe/listev" element={<Listev/>} />
                  <Route exact path="/employe/updateor/:id" element={<Upor/>} />
                  <Route exact path="/employe/tacheorup" element={<Tacheup/>} />
                </>
              ) : null
            ) : null}
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </div>
  );
};
export default Employee;
