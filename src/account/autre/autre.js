import React, { useState,useEffect } from 'react';
import { List, Spin,Modal } from 'antd';
import {  EyeOutlined,CloseOutlined,SettingOutlined  } from '@ant-design/icons';
import axios from'axios';
import download from 'downloadjs'
const { confirm } = Modal;

  
function Autre (){

  const [fact,setfact]=useState([]);
  const [res,setres]=useState([]);
  const user=JSON.parse(localStorage.getItem("user"))
  useEffect(async()=>{ 
      const {data}= await axios.get('/api/fact/get_factcin/'+user.cin,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        console.log(data)
        setfact(data)
       const reponse= await axios.get('/api/admin/get_reservation_by_cin/'+user.cin,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        console.log(reponse.data)
        setres(reponse.data)
    return ()=>{
  }
  },[])
  const refuser=(i,id)=>{
    axios.delete('/api/reservation/delete_reservation/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
       .then(response => { 
        console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      });    
     document.getElementsByClassName("ant-row")[0].children[i].style="display:none";
   }

const [search,setsearch]=useState("");
const onsearch=e=>{
  setsearch(e.target.value)

 }
const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
const pdf=(id)=>{
  axios.get('/api/fact/pdffact/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },responseType: 'arraybuffer'})
  .then(response => { 
    console.log(response)
   const content = response.headers['content-type'];
   download(response.data, "factid"+id+".pdf", content)
 })
 .catch(error => {
     console.log(error.response)
 });    
}
return(
  <div style={{textAlign:"center"}}>
  {!fact ?  <Spin indicator={antIcon} /> : 
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
    dataSource={fact.filter(item=>item.created_at.indexOf(search) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Listecontact" id={i}>
        
         <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Numero de Facture : {item.id}</li>
         <li>Date de creation : {item.created_at}</li>
         <li>Voiture id : {item.voiture_id}</li>
         <li>Client id : {item.client_id}</li>
             </ul>
                 <h5> <EyeOutlined onClick={()=>{pdf(item.idf)}}/></h5>
                

          </div></div>
        


      </List.Item>
    )}
  />
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
    dataSource={res.filter(item=>item.nom.indexOf(search) !== -1||item.prenom.indexOf(search) !== -1||item.model.toString().indexOf(search) !== -1 ||item.matricule.toString().indexOf(search) !== -1) }
    renderItem={(item,i) => (
      <List.Item className="Listecontact" id={i}>
        
         <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
            <li>Modele:&nbsp;{item.model}</li>
         <li>Matricule:&nbsp;{item.matricule}</li>
         <li>Client:&nbsp;{item.nom+" "+item.prenom}</li>
         {item.status==null?<li>reservation refuser</li>:item.date!=null?<li>reservation acceptée le:&nbsp;{item.date}</li>:<li>Reservation en cours:&nbsp;----/--/--</li>}
             </ul>
             <h5>{<div><CloseOutlined onClick={()=>{refuser(i,item.id)}} id={i} /></div>}</h5>
                

          </div></div>
        


      </List.Item>
    )}
  /></div>}</div>
  
);}
export default Autre; 