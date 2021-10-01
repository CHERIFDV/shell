import React, { useState,useEffect } from 'react';
import { List, Modal,Input } from 'antd';
import {
    FormOutlined,
  } from '@ant-design/icons';
  import LoadingPage from "../loading/LoadingPage";
  import axios from'axios';
  import { Link } from "react-router-dom";
  const { confirm } = Modal;
function Listereservation (){
  const [search,setsearch]=useState("");
  const [data,setdata]=useState();
  useEffect(()=>{

      const fetchData=async()=>{
        const {data} =await axios.get("/api/admin/get_Or_Valide",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        setdata(data)
        }

      fetchData();
    
    return ()=>{
      
    }
  },[])

  const onsearch=e=>{
    setsearch(e.target.value.toLowerCase())
   }


return(
  <div style={{textAlign:"center"}}>
    <input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
  {!data ?  <LoadingPage/>  : 

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
    dataSource={data.filter(item=>item.model.toLowerCase().indexOf(search) !== -1||item.prenom.toLowerCase().indexOf(search) !== -1||item.nom.toString().toLowerCase().indexOf(search) !== -1 ||item.num_immatriculation.toString().indexOf(search) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Listereservation" id={i}>
       
    <div className="reservation">
    <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Modele:&nbsp;{item.model}</li>
         <li>Matricule:&nbsp;{item.num_immatriculation}</li>
         <li>Client:&nbsp;{" "+item.nom+" "+item.prenom}</li>
         <li>Tel:{" "+item.tel}</li>
             </ul>
                 <h5> <Link to={"./factor/"+item.id} style={{float:"right"}}><FormOutlined  style={{fontSize:"40px"}} /></Link></h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  />}</div>
  
);}
export default Listereservation; 