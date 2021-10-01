import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Listereservation from'./listereservation/listevoitureres';
import Menu1 from'./menu/menu';
import Listeor from'./gtacheor/listeor';
import Listeorup from'./update/listeor';
import Listev from'./update/listev';
import Listetach from'./gtacheor/listetache';
import NotFound from "../Notfound/Notfound";
import Login from"./Login/Login";
import Rp from"./Login/restarpassword";
import Registeremp from"./Register/Register";
import Controletache from"./gtacheor/controletache";
import Terror from"./gtacheor/tacheerrore";
import Tachff from"./gtacheor/listetacheaff";
import Reparationdetache from"./gtacheor/reparationtache";
import Addvoirure from'./addvoiture/addvoiture';
import Registerclient from'./addvoiture/client';
import Tache from"./addvoiture/tache";

import Listeclient from"./addvoiture/listeclient";
import ORvoiture from"./addvoiture/orvoiture";
import Photo_or from"./addvoiture/photo";
import Upv from"./update/updatevoiture";
import Upor from"./update/updateorvoiture";
import Tacheup from"./update/tache";
import { Layout} from 'antd';
import './employee.scss';
const { Content, Footer, Sider } = Layout;
const Employee=()=>{
  const emp=JSON.parse(localStorage.getItem("emp"))
  let location = useLocation();
  
 
    return (
      <div className="navbara navbarc">

      <Layout style={{ minHeight: '100vh' }}>  
          <Content  style={{  }}>       
          <SwitchTransition>
      <CSSTransition
        key={location.key || false}
        timeout={800}
        classNames="fadeScale">
        <Switch location={location}>
          {/* employee Routes*/}  
          
           <Route exact  path="/employe/loginem" component={Login} />
           <Route exact  path="/employe/register" component={Registeremp} />
    
           <Route exact  path="/employe/tache" component={Tache} /> 
           <Route exact  path="/employe/" component={Menu1} />
          
           <Route exact  path="/employe/restarpassword/:id" component={Rp} />
           
      
        {emp?
        emp.role ==1 ?<>
          <Route exact  path="/employe/listetach" component={Listetach} /> 
          <Route exact  path="/employe/listetachemp" component={Tachff} /> 
           </> :
          emp.role ==3 ?<>
           <Route exact  path="/employe/controltache" component={Controletache} />
           <Route exact  path="/employe/tacheserror" component={Terror} />
           <Route exact  path="/employe/Reparationdetache" component={Reparationdetache} />   
           <Route exact  path="/employe/listeor" component={Listeor} />
          
                    </> :
         emp.role ==2 ?<>
          <Route exact  path="/employe/OR" component={Registerclient} /> 
        <Route exact  path="/employe/reservation" component={Listereservation} />
        <Route exact  path="/employe/listeclient" component={Listeclient} />
        <Route exact  path="/employe/addvoiture" component={Addvoirure} /> 
        <Route exact  path="/employe/ORvoiture" component={ORvoiture} /> 
        <Route exact  path="/employe/Photo" component={Photo_or} /> 
        <Route exact  path="/employe/updatevoiture/:id" component={Upv} /> 
        <Route exact  path="/employe/listeor" component={Listeorup} />
        <Route exact  path="/employe/listev" component={Listev} />
        <Route exact  path="/employe/updateor/:id" component={Upor} /> 
        <Route exact  path="/employe/tacheorup" component={Tacheup} /> 
            </>:<> </>:<> </>}
            
            </Switch>
            </CSSTransition>
            </SwitchTransition>
   
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
     
  
      </div>
      
    );
    
}
export default  Employee;