import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Select,Modal,Input} from 'antd';
import {ExclamationCircleOutlined,PlusOutlined,DeleteOutlined} from '@ant-design/icons';
import LoadingPage from "../../loading/LoadingPage";
  import './listeor.scss';
  const { confirm } = Modal;
function Liste (props){
const supprimer=(i,id)=>{
  const V=(i,id)=>{
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.delete('../api/admin/delete_tache/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
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
const [ref,setref]=useState(1);

const [data,setdata]=useState();
const [empl,setempl]=useState([]);
const [loading,setloading]=useState(false);
useEffect(async ()=>{ 
  var {data}= await axios.get('../api/admin/get_tache_error',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
  console.log("render")
  setdata(data)
  var {data} =await axios.get("../api/admin/get_mecanicien",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }});
  setempl(data)
  return ()=>{  
}
},[ref])

const addemploye= async(i,id)=>{
  var emp
    const V=(i,id,emp)=>{
      setloading(true)
    document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
    axios.put('../api/personnel/add_personnel_into_tache/'+id,{personnel_id:emp})
         .then(response => { 
          setloading(false)
        })
        .catch(error => {
              setloading(false)
        });   
      }
      confirm({
       title: 'Vous etes sur ?',
       icon: <ExclamationCircleOutlined />,
       content:<Select
           onChange={e=>{emp=e}}
           style={{ display: 'block' }}
          >{
            empl.map(function (item) {
               return(
              <option value={item.id} label={item.nom+" "+item.prenom} >{item.nom+" "+item.prenom}</option>
               )
            })
          }
          </Select> ,
       onOk() {
         V(i,id,emp)
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
  {!data ?  <LoadingPage/>  : 

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
    dataSource={data.filter(item=>item.designation.toLowerCase().indexOf(search.toLowerCase()) !== -1  )}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>
       <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Name:&nbsp; {item.designation}</li>
         <li>Tva:&nbsp; {item.tva}</li>
         <li>Prix:&nbsp; {item.id}</li>
         <li>Matricule :&nbsp; {item.num_immatriculation}</li>
             </ul>
                 <h5>
                 <PlusOutlined onClick={()=>{addemploye(i,item.id)}}/>
                 <div style={{float:"right"}}>
                 <DeleteOutlined onClick={()=>{supprimer(i,item.id)}} />
                 </div>
               
                 </h5>
          </div></div>
      </List.Item>  
    )}
  /></div>}    </div>
  
);}
export default Liste; 
