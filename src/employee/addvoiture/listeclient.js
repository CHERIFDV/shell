import React, { useState,useEffect } from 'react';
import { List,Modal } from 'antd';
import LoadingPage from "../../loading/LoadingPage";
import {
FormOutlined,
  } from '@ant-design/icons';
  import axios from'axios';
  
import { Link } from "react-router-dom";


function Listeclient (){
  const [search,setsearch]=useState("");
  const onsearch=e=>{
    setsearch(e.target.value)
  
   }


const [data,setdata]=useState();

useEffect(async()=>{ 
    const {data}= await axios.get('/api/client/get_client',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})

     setdata(data)

  return ()=>{
      
}
},[])

return(
  <div style={{textAlign:"center"}}>
  {!data ?  <LoadingPage/>  : 
  <div >
      <input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
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
    className="bb"
    dataSource={data.filter(item=>item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.cin.toString().indexOf(search) !== -1 ||item.tel.toString().indexOf(search) !== -1) }
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Nom : {item.nom}</li>
         <li>Prenom : {item.prenom}</li>
         <li>Cin : {item.cin}</li>
         <li>Tel : {item.tel}</li>
             </ul>
                 <h5><div className="ss">

    <Link to={{ pathname: "./addvoiture", state:{id: item.id} }} style={{float:"right"}}><FormOutlined   /></Link>
    </div></h5>
          </div></div>




      </List.Item>
      
    )}
  />
</div>}</div>
);}
export default Listeclient; 