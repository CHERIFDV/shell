import React, { useState,useEffect } from 'react';
import { List,Modal,Image } from 'antd';
import LoadingPage from "../loading/LoadingPage";
import {

    DeleteOutlined,
    EyeOutlined,FormOutlined,
    ExclamationCircleOutlined
  } from '@ant-design/icons';
  import axios from'axios';
  import './listeclient.scss';
import { Link } from "react-router-dom";
const { confirm } = Modal;

function Listeclient (){

  const [loading,setloading] = useState(true);

const supprimer=(i,id)=>{
  
  document.getElementsByClassName("ant-row")[0].children[i].style="display:none"
  axios.delete('/api/client/delete_client/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
       .then(response => { 
        console.log(response)
      })
      .catch(error => {
        setloading(false)
      });     
    
}
const [data,setdata]=useState();

useEffect(async()=>{ 
    const {data}= await axios.get('/api/client/get_client',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})

     setdata(data)

  return ()=>{
      
}
},[])

const [isModalVisible, setIsModalVisible] = useState(false);
const [clientvoitures,setclientvoitures]=useState([]);
const showModal = async(id) => {
  const {data}= await axios.get('/api/client/get_client/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
     console.log(data[1]);
     const b=[];
     b.push(
      <div>
         <p>Nom :&nbsp;{data[0].nom}</p>
         <p>Prenom :&nbsp;{data[0].prenom}</p>
         <p>Cin :&nbsp;{data[0].cin}</p>
         <p>Tel :&nbsp;{data[0].tel}</p>
      </div>
     )
      data[1].map(function(item,i){
        b.push(   <div><h1>Voiture:{i+1}</h1>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Matricule:&nbsp;{item.num_immatriculation}</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Modele:&nbsp;{item.model}</p>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;<Image src={item.image1}/><Image src={item.image2}/></div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<Image src={item.image3}/><Image src={item.image4}/></div>
          </div>
        )
       
         })

  setclientvoitures(b)
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};
const [isModalVisibles, setIsModalVisibles] = useState(false);
const [id, setid] = useState({id:"",i:""});
  const showModals = (id,i) => {
    setid({id:id,i:i})
    setIsModalVisibles(true);
  };

  const handleOks = () => {
    supprimer(id.i,id.id)
    setIsModalVisibles(false);
  };

  const handleCancels = () => {
    setIsModalVisibles(false);
  };
  const [search,setsearch]=useState("");
  const onsearch=e=>{
    setsearch(e.target.value)
  
   }
return(
  <div style={{textAlign:"center"}}>
  {!data ?  <LoadingPage/>  : 
  <div >
    
    <Modal title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    {clientvoitures}
      </Modal>
      <Modal title="" visible={isModalVisibles} onOk={handleOks} onCancel={handleCancels}>
           <p>Vous voulez supprimer cette client</p>
      </Modal>
      <input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
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
    className="bb"
    dataSource={data.filter(item=>item.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1||item.cin.toString().indexOf(search) !== -1 ||item.tel.toString().indexOf(search) !== -1) }
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>

       <div className="card">
          <div className="card-body">
            <h2>{}</h2>
            <ul>
         <li>Nom : {item.nom}</li>
         <li>Prenom : {item.prenom}</li>
         <li>Cin : {item.cin}</li>
         <li>Tel : {item.tel}</li>
             </ul>
                 <h5><div className="ss"  >
    <EyeOutlined onClick={()=>{showModal(item.id)}} id={i} className={i+"b"}  />
 
    <DeleteOutlined className="supprimer"onClick={()=>{showModals(item.id,i)}} id={i} />
    <Link to={"./modifclient/"+item.id} style={{float:"right"}}><FormOutlined   /></Link>
    </div></h5>
          </div></div>




      </List.Item>
      
    )}
  />
</div>}</div>
);}
export default Listeclient; 