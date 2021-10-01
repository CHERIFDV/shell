import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Input,Modal} from 'antd';
import {PauseOutlined,
  CaretRightOutlined,
  CloseOutlined,CheckOutlined  ,ExclamationCircleOutlined
  } from '@ant-design/icons';
  import './listeor.scss';
  import LoadingPage from "../../loading/LoadingPage";
  const { confirm } = Modal;
function Liste (props){
  const emp=JSON.parse(localStorage.getItem("emp"))
  const [loading,setloading]=useState(false);
const [data,setdata]=useState();
const [verif,setverif]=useState(null);
useEffect(async ()=>{ 
  const {data}= await axios.get("../api/admin/get_tache_by_personnel_id/"+emp.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
  console.log(data)
  setdata(data)
  return ()=>{
      
}
},[verif])

const start=(i,id)=>{
  setloading(true)
     setverif(id)
    document.getElementById(i+"s").style="display:none"
   document.getElementById(i+'p').style="display:"
   axios.put('/api/personnel/start_tache/'+id,{id:1},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
   .then(response => { 
    setloading(false)
  })
  .catch(error => {
      console.log(error.response)
  });   
}
const pause=(i,id)=>{
  setloading(true)
  setverif(null)
 axios.put('../api/personnel/stop_tache/'+id,{id:1},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
   .then(response => { 
    setloading(false)
    document.getElementById(i+"p").style="display:none"
 document.getElementById(i+'s').style="display:"
  })
  .catch(error => {
      console.log(error.response)
  });   
}
const termine=(i,id)=>{
  setloading(true)
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
 axios.put('../api/personnel/termine_tache/'+id,{id:1},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
   .then(response => { 
    setloading(false)
  })
  .catch(error => {
        setloading(false)
  });   
}
const erreur=(i,id)=>{
 
  var des=""
  const V=(des,i)=>{
    setloading(true)
    axios.put('../api/personnel/probleme_tache/'+id,{description:des},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        setloading(false)
       document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
     })
     .catch(error => {
           setloading(false)
     });   }  


  confirm({
    title: 'Vous etes sur ?',
    icon: <ExclamationCircleOutlined />,
    content:<Input onChange={(e)=>{des=e.target.value}} className="inputerrore"></Input>,
    onOk() {
      V( des,i)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const [search,setsearch]=useState("");
const onsearch=e=>{
  setsearch(e.target.value)

 }
 
return(

  <div style={{textAlign:"center"}} className="tr">{loading?<LoadingPage/> :<></>}
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
          <div className="card-body">
            <h2>{}</h2>
            <ul>
                <li>Tache :&nbsp; {item.designation}</li>
                <li>Etat : &nbsp;{item.etat}</li>
                <li>Matricule :&nbsp; {item.num_immatriculation}</li>
                <li>duré :&nbsp; {item.qte*60} mins</li>
             </ul>
                 <h5><div className="ss"  >
                       { item.etat==="en coure" || verif==item.id ?<><CloseOutlined  onClick={()=>{erreur(i,item.id)}} /></>:<>
                         <CheckOutlined  onClick={()=>{termine(i,item.id)}}  />
                         <CloseOutlined  onClick={()=>{erreur(i,item.id)}} /></>
                       }

                         <div style={{float:"right"}}>{item.etat=="En attente"||item.etat=="en pause" ?<><PauseOutlined  onClick={()=>{pause(i,item.id)}} id={i+"p"} style={{display:'none'}} /> <CaretRightOutlined id={i+"s"}   onClick={()=>{start(i,item.id)}}/> </> :<><PauseOutlined  onClick={()=>{pause(i,item.id)}} id={i+"p"}  /> <CaretRightOutlined id={i+"s"} style={{display:'none'}}  onClick={()=>{start(i,item.id)}}/></>}</div>
                 </div></h5>
          </div></div>
      </List.Item>  
    )}
  /></div>}</div>
  
);}
export default Liste; 