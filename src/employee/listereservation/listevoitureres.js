import React, { useState,useEffect } from 'react';
import { List, Modal,Input } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  CarOutlined
  } from '@ant-design/icons';
  import LoadingPage from "../../loading/LoadingPage";
  import { Link } from "react-router-dom";
  import axios from'axios';

  const { confirm } = Modal;
function Listereservation (){
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState();
  useEffect(()=>{
      const fetchData=async()=>{
        const {data} =await axios.get("/api/admin/reservationAccepted",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }});
        setdata(data)
        setloading(false)
        }
      fetchData();
    return ()=>{
    }
  },[])

  


const [search,setsearch]=useState("");

  const onsearch=e=>{
    setsearch(e.target.value)
  
   }
return(
    <div style={{textAlign:"center"}} >
     <input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
  {!data?<LoadingPage/> :
  
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    dataSource={data.filter(item=>item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||item.matricule.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Listereservation" id={i}>
       
    <div className="reservation">
    <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Modele:&nbsp;{item.model}</li>
         <li>Matricule:&nbsp;{item.matricule}</li>
         <li>Client:&nbsp;{item.nom+" "+item.prenom}</li>
         <li>Tel:{item.tel}</li>
             </ul>
                 <h5>{<div><Link to={{pathname: "./OR",state:item }}><CheckOutlined  /></Link>&nbsp;&nbsp;&nbsp;&nbsp;</div>}</h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  />}</div>
  
);}
export default Listereservation; 