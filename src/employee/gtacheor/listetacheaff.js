import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Modal} from 'antd';

  import './listeor.scss';
  import LoadingPage from "../../loading/LoadingPage";
  const { confirm } = Modal;
function Liste (props){
  console.log(props.location.state)
  const [loading,setloading] = useState(true);


const [data,setdata]=useState();
const emp=JSON.parse(localStorage.getItem("emp"))
useEffect(async ()=>{ 
  const {data}= await axios.get("../api/admin/get_tache_termine_employee/"+emp.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
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
  {!data ?  <LoadingPage/>: 
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
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Tache :&nbsp; {item.designation}</li>
         <li>Etat : &nbsp;{item.etat}</li>
         <li>Matricule :&nbsp; {item.num_immatriculation}</li>
             </ul>
          </div></div>
      </List.Item>  
    )}
  /></div>}</div>
  
);}
export default Liste; 