import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Image,Modal} from 'antd';
import LoadingPage from "../loading/LoadingPage";
import {FormOutlined,
    DeleteOutlined,
    EyeOutlined,EyeInvisibleOutlined  ,ExclamationCircleOutlined
  } from '@ant-design/icons';
  import './listeproduit.scss';
  import { Link } from "react-router-dom";
  const { confirm } = Modal;
function Liste (){



const supprimer=(i,id)=>{
  const V=(i,id)=>{
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.delete('/api/reparation/delete_rep/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
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
const [data,setdata]=useState();
useEffect(async ()=>{ 
  const {data}= await axios.get('/api/reparation/get_rep',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  console.log(data)
  setdata(data)
  return ()=>{
      
}
},[])

const [search,setsearch]=useState("");
const onsearch=e=>{
  setsearch(e.target.value)

 }
return(

  <div style={{textAlign:"center"}}>
  {!data ?  <LoadingPage/> : 
      <div   style={{textAlign:"left"}}>
        <input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 3,
      lg: 3,
      xl: 4,
      xxl: 4,
    }}
    className="bb"
    dataSource={data.filter(item=>item.designation.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <Image src={item.photo} />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Name:{item.designation}</li>
         <li>Tva:{item.tva}</li>
         <li>Prix:{item.price}</li>
             </ul>
                 <h5><div className="ss"  >
    <DeleteOutlined className="supprimer"onClick={()=>{supprimer(i,item.id)}} id={i} />
    <Link to={"./Modifier/"+item.id} style={{float:"right"}}><FormOutlined   /></Link>
    
    </div></h5>
          </div></div>




      </List.Item>
      
    )}
  /></div>}</div>
  
);}
export default Liste; 