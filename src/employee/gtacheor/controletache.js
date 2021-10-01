import React, { useState,useEffect } from 'react';
import axios from'axios';
import { List ,Select,Spin,Modal} from 'antd';
import {CheckOutlined,
    CloseOutlined,
  SettingOutlined,ExclamationCircleOutlined
  } from '@ant-design/icons';
  import './listeor.scss';
  import LoadingPage from "../../loading/LoadingPage";
  const { confirm } = Modal;
  function Liste (){
  const [data,setdata]=useState();
  const [empl,setempl]=useState([]);
 useEffect(async ()=>{ 
  var {data}= await axios.get('../api/admin/get_tache_termine',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
  console.log(data)
  setdata(data)
  
  var {data} =await axios.get("../api/admin/get_mecanicien",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }});
  setempl(data)

  return ()=>{   
  }
  },[])
const [loading,setloading]=useState(false);
const [search,setsearch]=useState("");
const onsearch=e=>{
  setsearch(e.target.value)
 }
 const valid= async(i,id)=>{
  setloading(true)
    document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
    axios.put('../api/personnel/valide_tache/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
         .then(response => { 
          setloading(false)
        })
        .catch(error => {
              setloading(false)
        });   
      }


 const notvalid=(i,id)=>{
  var emp
  const V=(i,id,emp)=>{
    setloading(true)
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.put('../api/personnel/invalid_tache/'+id,{personnel_id:emp},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
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

  

return(

  <div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
  {!data ? <LoadingPage/>  : 
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
    dataSource={data/*/.filter(item=>item.designation.indexOf(search) !== -1)/*/}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
            <li>Tache :&nbsp; {item.designation}</li>
           <li>Etat : &nbsp;{item.etat}</li>
           <li>employee : &nbsp;{item.nom+" "+item.prenom}</li>
           <li>date : &nbsp;{item.updated_at}</li>
             </ul>
                 <h5><div className="ss"  >
                 <CheckOutlined onClick={()=>{valid(i,item.id)}}/>
                 <CloseOutlined  onClick={()=>{notvalid(i,item.id)}} style={{float:"right"}}/>
    
    </div></h5>
          </div></div>

      </List.Item>
      
    )}
  /></div>}</div>
  
);}
export default Liste; 