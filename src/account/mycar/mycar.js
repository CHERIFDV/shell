
//import {useState}from'react';
import { Progress } from 'antd';
import React, { useState,useEffect } from 'react';
import { List, Card ,Spin,Image} from 'antd';
import turbo from'./turbo-engine.png';
import engine from'./car-engine.png';
import gas from'./gas-pump.png';
import trace from'./race-track.png';
import {
  SettingOutlined,
  } from '@ant-design/icons';
  import axios from'axios';
import './mycar.scss';
  


function Mycar() {

  const [loading,setloading] = useState(true);
  const [v,setv]=useState([]);
  const [or,setor]=useState([]);
  const [tache,settache]=useState([]);
  useEffect(()=>{
      const fetchData=async()=>{
        const {data} =await axios.get("/api/voiture/get_voiture_by_cin/"+JSON.parse(localStorage.getItem("user")).cin,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }});
        console.log(data)
        setv(data[0])
        setor(data[1])
        settache(data[2])
          setloading(false)
        }
      fetchData();
    return ()=>{
    }
  },[])
  const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
  var data1 = [
    {
      img: gas,
    },
    {
      img: engine,
    },
    {
      img: turbo,
    }, 
     {
      img: trace,
    }, 
   
    
  ]
  var rep=""
  return (
    <div style={{textAlign:"center"}}>
  {!v.length ?  <Spin indicator={antIcon} /> :
  <>
   <List className="mycar"
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
      xxl: 1,
    }}
    dataSource={v}
    renderItem={v => (
      <List.Item  className="Liste"  id={v.num_immatriculation}>
        <Card  title={<div className="liste1"  >
          <ul>
           <li>Marque : {v.marque}</li>
           <li>Matricule:{v.num_immatriculation}</li>
           <li>Modele:{v.model}</li>
          </ul>
          <ul>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
    dataSource={or.filter(item=>item.voiture_id==v.id)}
    renderItem={or => (
      <List.Item >
      <li>
      <Card   > 
      
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 3,
          xxl: 4,
        }}
        dataSource={[or.image1,or.image2,or.image3,or.image4]}
        renderItem={br => (
          <List.Item >
      <Image width={200} src={br}/>
      </List.Item>
      
         ) }/>
   <br></br>
   <p> <Image width={100} src={data1[0].img}/><p>{or.niveau_carburant}</p>
          <Image width={100} src={data1[3].img}/><p>{or.KM}</p>
           <Image width={100} src={data1[1].img}/><p>{or.code_moteur}</p></p>
       </Card>
{
  tache.filter(t=>t.or_id==or.id).map(function(params,i) {
    console.log(params,i)
    var nbtache=tache.filter(item=>item.or_id==or.id).length
    var nbtachenotter=tache.filter(item=>item.or_id==or.id&&item.etat==="valide").length
    var error=""
    var description=[]
    if (params.etat==="erreur") {
      error="exception"
      
      description.push(<p>{params.description}</p>)
    }
    var pr=(100/nbtache)*nbtachenotter
    rep=(<div>  <Progress type="circle" percent={pr} status={error}/>{description} </div>)

  }),
  rep
       
}
       </li>
      </List.Item>
    )}
  /></ul>
    </div>
    
    
    }> </Card>
      </List.Item>
    )}
  />
  </>}
  
  
  </div>);
}


export default Mycar;
