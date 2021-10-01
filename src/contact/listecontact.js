import React, { useState,useEffect } from 'react';
import { List } from 'antd';
import {  EyeOutlined  } from '@ant-design/icons';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";

  import './listecontact.scss';
function Listecontact (){

  const [data,setdata]=useState();

  useEffect(async()=>{ 
      const {data}= await axios.get('/api/contact/get_contact',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  
       setdata(data)
  
    return ()=>{
        
  }
  },[])





const supprimer=(i,id)=>{
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.delete('/api/contact/delete_contact/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  .then(response => { 
   console.log(response)
 })
 .catch(error => {
     console.log(error.response)
 });     
}
return( 
  <div>
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
    dataSource={data}
    renderItem={(item,i) => (
      <List.Item className="Listecontact" id={i}>
        
         <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Name:{item.nom}</li>
         <li>Email:{item.email}</li>
         <li>Phone:{item.tel}</li>
         <li>Description:{item.description}</li>
             </ul>
                 <h5><EyeOutlined onClick={()=>{supprimer(i,item.id)}} id={i}/></h5>
          </div></div>
        


      </List.Item>
    )}
  />}</div>
  
);}
export default Listecontact; 