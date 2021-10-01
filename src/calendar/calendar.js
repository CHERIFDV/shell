import  { useState, useEffect} from 'react';
import { Calendar, Badge,Modal } from 'antd';
import { format } from 'date-fns';

import axios from'axios';
import './calendar.scss';


function getListData(value,data) {
  let listData=[];
  data.map(function(item){
        
    if (format(new Date(value),'yyyy/MM/dd') === format(new Date(item.date),'yyyy/MM/dd')) {
      listData.push(
        { type: 'warning', content: item.nom+" "+item.prenom, data:item },
  
      )
    }

  })
  
  return listData || [];
}


function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}


function Caledar() {
  const [data,setdata]=useState([]);

  useEffect(()=>{
  const fetchData=async()=>{
    const {data} =await axios.get("/api/admin/reservationAccepted",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
    setdata(data);
  }
  fetchData()

  return ()=>{
      
  }
},[])




const dateCellRender=(value)=> {
  const listData = getListData(value,data);

  return (
    <ul className="events" onClick={()=>{
      
      Modal.info(
        {
          title: 'Use Hook!',
          content: (
            listData.map((item) => (
              <li key={item.content}>
                {"Nom: "+item.content+"  TEL :"+item.data.tel}
              </li>
            ))
          ),
        }    
      );
    }} >
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}


    return(<>{data.lenght ? <div></div>:
        <Calendar  className="calendar" dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    }</>)

}



export default Caledar; 
