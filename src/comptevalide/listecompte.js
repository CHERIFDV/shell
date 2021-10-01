import React, { useState,useEffect } from 'react';
import { List,Input} from 'antd';
import {
  CloseOutlined,
  CheckOutlined
  } from '@ant-design/icons';
  import firebase from "../firebase.config";
  import './comptevalide.scss';
  import { format } from 'date-fns';
  import axios from'axios';
  import LoadingPage from "../loading/LoadingPage";
function Listecompte (){
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState('');
  const [data1,setdata1]=useState('');
  const [loading1,setloading1]=useState(false);
  useEffect(()=>{
    setloading1(false)
      const fetchData=async()=>{
        const {data} =await axios.get("/api/admin/usersNotActive",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        console.log("gg")
        setdata(data) 
        }
      fetchData();
      const fetchData1=async()=>{
        const {data} =await axios.get("/api/admin/personnelNotActive",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        setdata1(data)  
        }
      fetchData1();
    return ()=>{ 
    }
  },[loading])

  
const accepter=(i,id)=>{
  setloading1(true)
  axios.put('/api/admin/update_status/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
  
      firebase.database()
      .ref("rooms")
      .child(id)
      .set({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        userId: id,
        username: response.data.data.nom + " " + response.data.data.prenom,
        userMessages: 0,
        adminMessages: 0,
      });
      setloading(false)
   })
   .catch(error => {
       console.log(error.response)
   });    
   setloading1(false)
}
const refuser=(i,id)=>{
  setloading1(true)
    axios.put('/api/admin/delete_user/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
     console.log(response)
     setloading1(false)
   })
   .catch(error => {
    setloading1(false)
       console.log(error.response)
   });    setloading(2)
}
const accepter1=(i,id)=>{
  setloading1(true)
  axios.put('/api/admin/active_account_personnel/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
     console.log(response)
     setloading1(false)
   })
   .catch(error => {
    setloading1(false)
       console.log(error.response)
   });    
   setloading(3)
}
const refuser1=(i,id)=>{
  setloading1(true)
    axios.put('/api/admin/delete_personnel/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
     console.log(response)
     setloading1(false)
   })
   .catch(error => {
    setloading1(false)
       console.log(error.response)
   });    
   setloading(4)
}
const [search,setsearch]=useState("");

  const onsearch=e=>{
    setsearch(e.target.value)
  
   }
return(
  
  <div>{loading1?<LoadingPage/> :<></>}
    {!data ?  <LoadingPage/>  : <div>
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
    dataSource={data.filter(item=>item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.cin.toString().indexOf(search) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Listecompte" id={i}>
       
    <div className="compte">
    <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Email:&nbsp;&nbsp;{item.email}</li>
         <li>Nom Prenom:&nbsp;{item.nom+" "+item.prenom}</li>
         <li>Cin:&nbsp;{item.cin}</li>
         <li>Date:&nbsp;{format(new Date(item.created_at), 'yyyy/MM/dd ')}</li>
         


             </ul>
                 <h5>{<div><CheckOutlined onClick={()=>{accepter(i,item.id)}} id={i} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CloseOutlined onClick={()=>{refuser(i,item.id)}} id={i} /></div>}</h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  />
   <hr
        style={{
            color: "black",
            backgroundColor: "black",
            height: 5
        }}
    />
    <h1>Personnel</h1>
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
    dataSource={data1}
    renderItem={(item,i) => (
      <List.Item className="Listecompte" id={i}>
       
    <div className="compte">
    <div className="card">
          <img src="" />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Email:&nbsp;&nbsp;{item.email}</li>
         <li>Nom Prenom:&nbsp;{item.nom+" "+item.prenom}</li>
         <li>Cin:&nbsp;{item.cin}</li>
     
             </ul>
                 <h5>{<div><CheckOutlined onClick={()=>{accepter1(i,item.id)}} id={i+"p"} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CloseOutlined onClick={()=>{refuser1(i,item.id)}} id={i+"p"} /></div>}</h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  />
 </div>}</div>
);}
export default Listecompte; 