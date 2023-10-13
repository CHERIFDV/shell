import React, { useEffect,useState } from 'react';


import {BrowserRouter,Route} from 'react-router-dom';

import Profile from './Profile/Profile';
import Password from './Password/Password';
import Details from './Details/Details';
import Autre from './autre/autre';

import Mycar from './mycar/mycar';

import { Menu } from 'antd';
import {
  CarOutlined,
  SecurityScanOutlined,
  PieChartOutlined,
  DesktopOutlined,
  CopyOutlined
  
} from '@ant-design/icons'
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import './account.scss';

const { SubMenu } = Menu;
function Account() 
{ 
  const navigate = useNavigate();
  const location = useLocation();
  console.log(localStorage.getItem("user"))
  const widthw=window.innerWidth;
    if (JSON.parse(localStorage.getItem("user"))==null) {
      let { from } = location.state || { from: { pathname: "/login" } };
      navigate(from); 
      }
         return(
   <div className="account">
     <BrowserRouter>
     <div style={{  }} className="liste">
        <Menu
        style={{position: "fixed",top: widthw < 1350 ?  "50px" :"" }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="horizontal"
         
          inlineCollapsed={false}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/Account">
          Compte</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SecurityScanOutlined />}>
          <Link to="/Account/Password">
          Mot de passe</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/Account/Details">
          Details</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<CarOutlined />}>
          <Link to="/Account/MyCar">
          Ma voiture(s)</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CopyOutlined />}>
          <Link to="/Account/autre">
          Autre</Link>
          </Menu.Item>
          
        </Menu>
      </div>
      <div className="content">
  
      <Route exact  path="/Account"  component={Profile} />
      <Route exact  path="/Account/Password" component={Password} />
      <Route exact  path="/Account/Details" component={Details} />
      <Route exact  path="/Account/MyCar" component={Mycar} />
      <Route exact  path="/Account/autre" component={Autre} />
      </div>
      
      </BrowserRouter>
     </div>
         )
     
         
       

}

export default Account;
