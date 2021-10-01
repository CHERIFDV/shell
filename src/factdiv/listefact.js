import React, { useState,useEffect } from 'react';
import { List,Modal } from 'antd';
import { DeleteOutlined, EyeOutlined,FormOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import axios from'axios';
import { Link } from "react-router-dom";
import download from 'downloadjs'
import LoadingPage from "../loading/LoadingPage";

const { confirm } = Modal;

  //import './listecontact.scss';
function Listefacture (){

  const [data,setdata]=useState();

  useEffect(async()=>{ 
      const {data}= await axios.get('/api/fact/get_fact',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        console.log(data)
       setdata(data)
  
    return ()=>{
        
  }
  },[])
  


const supprimer=(i,id)=>{
  const V=(i,id)=>{
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.delete('/api/fact/delete_fact/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  .then(response => { 
   console.log(response)
 })
 .catch(error => {
     console.log(error.response)
 });    
}
 confirm({
  title: 'Vous etes sur ?',
  icon: <ExclamationCircleOutlined />,
  content: '',
  onOk() {
    V(i,id)
  },
  onCancel() {
    console.log('Cancel');
  },
});
}
const [search,setsearch]=useState("");
const onsearch=e=>{
  setsearch(e.target.value.toLowerCase())

 }
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
  {!data ?  <LoadingPage/> : 
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
    dataSource={data/*/.filter(item=>item.voiture_id.indexOf(search) !== -1||item.created_at.toString().indexOf(search) !== -1 ||item.num_immatriculation.toString().indexOf(search) !== -1)/*/}
    renderItem={(item,i) => (
      <List.Item className="Listecontact" id={i}>
        
         <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Numero de Facture : {item.idf}</li>
         <li>Date de Creation : {item.created_at}</li>
         <li>Voiture : {item.num_immatriculation}</li>
         <li>Client cin : {item.cin}</li>
             </ul>
                 <h5> <EyeOutlined onClick={()=>{pdf(item.idf)}}/>  <DeleteOutlined className="supprimer"onClick={()=>{supprimer(i,item.id)}} id={i} />  <Link to={"./Modiffact/"+item.id} style={{float:"right"}}><FormOutlined   /></Link></h5>
                

          </div></div>
        


      </List.Item>
    )}
  /></div>}</div>
  
);}
export default Listefacture; 