import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Image,Modal} from 'antd';
import {FormOutlined } from '@ant-design/icons';
  import './listeor.scss';
  import { format } from 'date-fns';
  import { Link } from "react-router-dom";
  import LoadingPage from "../../loading/LoadingPage";
  const { confirm } = Modal;
  function Liste (){
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState();
 useEffect(async ()=>{ 
  const {data}= await axios.get('../api/admin/get_or_en_attenter',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
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

  <div style={{textAlign:"center"}} className="tr">
  {!data ? <LoadingPage/> : 
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
    dataSource={data.filter(item=>item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.prenom.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||item.num_immatriculation.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <Image src={item.photo} />
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Name:{item.nom+" "+item.prenom}</li>
         <li>date:{format(new Date(item.updated_at), 'yyyy/MM/dd ')}</li>
         <li>Modele:{item.model}</li>
         <li>Matricule:{item.num_immatriculation}</li>
             </ul>
                 <h5><div className="ss"  >
    <Link to={{ pathname: "./Reparationdetache", state: item.id }} style={{float:"right"}}><FormOutlined   /></Link>
    
    </div></h5>
          </div></div>

      </List.Item>
      
    )}
  /></div>}</div>
  
);}
export default Liste; 