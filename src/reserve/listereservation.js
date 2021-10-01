import React, { useState,useEffect } from 'react';
import { List, Modal,DatePicker } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,ExclamationCircleOutlined  
  } from '@ant-design/icons';
  import './listereservation.scss';
  import { format } from 'date-fns';
  import axios from'axios';
  import LoadingPage from "../loading/LoadingPage";
  import moment from 'moment';
  import {  notification} from 'antd';
  const { confirm } = Modal;
function Listereservation (){
  const [loading1,setloading1]=useState(false);
  const [data,setdata]=useState();
  useEffect(()=>{

      const fetchData=async()=>{
        const {data} =await axios.get("/api/admin/reservationNotAccepted",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        setdata(data)
       
        }

      fetchData();
    
    return ()=>{
      
    }
  },[])

  
const accepter=(i,id)=>{

  const V=(i,id)=>{
    setloading1(true)
   if(document.getElementsByClassName("ant-picker-input")[0].firstChild.value==""){
    setloading1(false)
    notification['warning']({
      message: 'warning',
      description:"date vide"
       ,
    });
    
    accepter(i,id)

    return
   }
  axios.put('/api/admin/accept_reservation/'+id,{date:document.getElementsByClassName("ant-picker-input")[0].firstChild.value},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
      setloading1(false)
      notification[response.data.type]({
        message: response.data.type,
        description:response.data.message
         ,
      });
   })
   .catch(error => {
       console.log(error.response)
   });    
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none";
 
  
}
var date="";
const fetchData=async(i,id)=>{
  const {data} =await axios.get("/api/admin/reservationAccepted",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
  const disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  confirm({
    title: 'Vous etes sur ?',
    icon: <ExclamationCircleOutlined />,
    content: <DatePicker className="devdev"
    disabledDate={disabledDate}
    dateRender={current => {
      const style = {};
      data.map(function(item){
        if (format(new Date(current),'yyyy/MM/dd') === format(new Date(item.date),'yyyy/MM/dd')) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }

      })
      
      return (
        <div className="ant-picker-cell-inner" style={style}>
          {current.date()}
        </div>
      );
    }}
  />,
    onOk() {
      V(i,id)
    },
    onCancel() {
      console.log('Cancel');
    },
  });





}
fetchData(i,id)

}
const refuser=(i,id)=>{
 axios.delete('/api/reservation/delete_reservation/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
      notification[response.data.type]({
        message: response.data.type,
        description:response.data.message
         ,
      });
   })
   .catch(error => {
       console.log(error.response)
   });    
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none";
}

return(<>{loading1?<LoadingPage/> :<></>}
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
    dataSource={data}
    renderItem={(item,i) => (
      <List.Item className="Listereservation" id={i}>
       
    <div className="reservation">
    <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Model:&nbsp;{item.model}</li>
         <li>Matricule:&nbsp;{item.matricule}</li>
         <li>Client:&nbsp;{item.nom+" "+item.prenom}</li>
         <li>Tel:{item.tel}</li>
             </ul>
                 <h5>{<div><CheckOutlined onClick={()=>{accepter(i,item.id)}} id={i} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CloseOutlined onClick={()=>{refuser(i,item.id)}} id={i} /></div>}</h5>
          </div>
        </div>
     
    </div>
      </List.Item>
    )}
  /></>
  
);}
export default Listereservation; 