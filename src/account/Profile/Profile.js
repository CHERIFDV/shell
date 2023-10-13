import React, { useEffect,useState } from 'react';
import { Table,Spinner } from 'reactstrap';
import { Image} from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import axios from'axios';
import './Profile.scss';
import {
  ToolOutlined
} from '@ant-design/icons';
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setloading] = useState(true);
  const user=JSON.parse(localStorage.getItem("user"))
  const [profile,setprofile] = useState(user);
    if (user==null) {
      let { from } = location.state || { from: { pathname: "/login" } };
      navigate(from); 
    }
return (
<div >
{!loading ?  <Spinner color="primary" ><ToolOutlined /></Spinner> : 
<div className="profile">
<Image className="phprofile" src={user.photo}/>
     <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
         
          <td>{profile.nom}</td>
          <td>{profile.prenom}</td>
          <td>{profile.email}</td>
        </tr>
        
      </tbody>
    </Table>
    </div>}
      </div>
         
      )


}

export default Profile;
