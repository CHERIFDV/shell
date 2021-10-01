


import { List, Spin,Image } from 'antd';
import React, { useState,useEffect } from 'react';
import axios from'axios';
import './service.scss';
import { SettingOutlined } from '@ant-design/icons';

 const Service =()=> {
 
  const [loading,setloading] = useState(true);
  const [data,setdata]=useState();
  useEffect(()=>{

      const fetchData=async()=>{
        const {data} =await axios.get("/api/service/get_service",{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        console.log(data)
        setdata(data)
          setloading(false)
       
        }

      fetchData();
    
    return ()=>{
      
    }
  },[])
  const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
   
    return (
      <div style={{textAlign:"center"}}>
    {!data ?  <Spin indicator={antIcon} /> : 
        <div className='Service' style={{textAlign:"left"}}>
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
    renderItem={item => (
       <List.Item  id={item.title}>
          <div className="card">
            <Image src={item.image}  />
            <div className="card-body">
              <h2>{item.titre}</h2>
              <p>{item.description}</p>
              <h5></h5>
          </div></div>
        </List.Item>
    )}
  />
      </div>}</div>
    );
  
}

export default Service;