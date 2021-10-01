


import { List,Image,Modal } from 'antd';
import React, { useState,useEffect } from 'react';
import axios from'axios';
import './listeservice.scss';
import LoadingPage from "../loading/LoadingPage";
import { DeleteOutlined,FormOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
const { confirm } = Modal;
 const Listeservice =()=> {
 
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState(null);
  const [search,setsearch]=useState("");
  const onsearch=e=>{
    setsearch(e.target.value)
  
   }
    
  useEffect(()=>{
    axios.get("/api/service/get_service",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
      console.log(res.data)
      setdata(res.data)
        setloading(false)
      })
    return ()=>{ 
    }
  },[])
  const supprimer=(i,id)=>{
    const V=(i,id)=>{
    document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
    axios.delete('/api/service/delete_service/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
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
 



    return (
      <div style={{textAlign:"center"}}>
    {!data ? <LoadingPage/>  : 
        <div  className="listeservice" style={{textAlign:"left"}}>
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
    dataSource={data.filter(item=>item.titre.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
   
    renderItem={(item,i)=>{
     
      return(
       <List.Item  id={item.title}>
          <div className="card">
            <Image src={item.image} className="imageservice" />
            <div className="card-body">
              <h2>Titre:&nbsp;{item.titre}</h2>
              <p>Description:&nbsp;{item.description}</p>
              
              <h5><DeleteOutlined onClick={()=>{supprimer(i,item.id)}} id={i}/><Link to={"./Modifservice/"+item.id} style={{float:"right"}}><FormOutlined   /></Link></h5>
          </div></div>
        </List.Item>)}
    }
  />
      </div>}</div>
    );
  
}

export default Listeservice;