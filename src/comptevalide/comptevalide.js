import React, { useState,useEffect } from 'react';
import { List, Modal,notification } from 'antd';
import {
  CloseOutlined,ExclamationCircleOutlined
  } from '@ant-design/icons';
  import './comptevalide.scss';
  import axios from'axios';
  import LoadingPage from "../loading/LoadingPage";
  const { confirm } = Modal;
function Listecomptevalide (){
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState([]);
  const [search,setsearch]=useState("");
  
  useEffect(()=>{
      const fetchData=async()=>{
        const {data} =await axios.get("/api/admin/users",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        setdata(data)
          setloading(false)
        }
      fetchData();
    return ()=>{
    }
  },[])

  
const supprimer=(i,id)=>{




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
const V=(i,id)=>{
  axios.delete('/api/admin/delete_user/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
     console.log(response)
     if(response.data.status==true){
      document.getElementsByClassName("ant-row")[0].children[i].style="display:none";}
     notification[response.data.type]({
      message: response.data.type,
      description:response.data.message
       ,
    });
   })
   .catch(error => {
       console.log(error.response)
   });    
  }
}
const onsearch=e=>{
  setsearch(e.target.value)

 }

return(

<div>
      {!data.length ?  <LoadingPage/>  :  <div>
  <>
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
    dataSource={data.filter(item=>item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Listecompte" id={i}>
       
    <div className="compte">
    <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Nom:{item.nom+" "+item.prenom}</li>
         <li>Email:{item.email}</li>
         <li>Role:{item.role_as=="user" ? "Client" : item.role_as=="emp" ? "Employer":"Admin"}</li>
         <li>Date:{item.created_at}</li>
             </ul>
                 <h5>{<div><CloseOutlined onClick={()=>{supprimer(i,item.id)}} id={i} /></div>}</h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  /></></div>}</div>
  
);}
export default Listecomptevalide; 