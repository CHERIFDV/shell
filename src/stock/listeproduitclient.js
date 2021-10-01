import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Image,Modal} from 'antd';
import LoadingPage from "../loading/LoadingPage";
 import './listeproduit.scss';
  
function Liste (){

 

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
    dataSource={data.filter(item=>item.designation.toLowerCase().indexOf(search.toLowerCase()) !== -1&&item.type.indexOf(1) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <Image src={item.photo} />
          <div className="card-body">
            <h2 style={{textAlign:"center"}}>{item.designation}</h2>
            <ul>
         <li>Prix :&nbsp; {Math.round(item.price*(1+item.tva/100))}</li>
             </ul>        
          </div></div>

      </List.Item>
      
    )}
  /></div>}</div>
  
);}
export default Liste; 