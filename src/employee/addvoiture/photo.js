import {Image ,Button,message,Upload } from 'antd';
import './addvoiture.scss';
import React,{ useState } from 'react';
import Webcam from "react-webcam";
import axios from'axios';
import LoadingPage from "../../loading/LoadingPage";
import { useHistory, useLocation } from "react-router-dom";

import { UploadOutlined  } from '@ant-design/icons';
import { Select } from 'antd';

function Photo(props) {
  const history = useHistory();
 const { state } = props.location
  const [loading,setloading]=useState(false);
  const [photo1,setphoto1]=useState();
  const [photo2,setphoto2]=useState();
  const [photo3,setphoto3]=useState();
  const [photo4,setphoto4]=useState();
  const [file1,setfile1]=useState();
  const [file2,setfile2]=useState();
  const [file3,setfile3]=useState();
  const [file4,setfile4]=useState();
  const [valid,setvalid]=useState(true);
  const handleChangep1=(e) =>{ 
    if (e.file.size>1000000) {
      message.error('Image must smaller than 2MB!');
      setvalid(false)
      return
    }else{
      setvalid(true) 
    }
    setfile1(e.file) 
    setloading(false)
    if(valid)
    try{
      setphoto1(window.URL.createObjectURL(e.file))}
    catch(TypeError){
           return
    }
   }
   const props1 = {
    onRemove: file => {
      setfile1(null)
      setphoto1(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
  const props2 = {
    onRemove: file => {
      setfile2(null)
      setphoto2(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
  const props3 = {
    onRemove: file => {
      setfile3(null)
      setphoto3(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
  const props4 = {
    onRemove: file => {
      setfile4(null)
      setphoto4(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
const handleChangep2=(e) =>{
  if (e.file.size>1000000) {
    message.error('Image must smaller than 2MB!');
    setvalid(false)
    return
  }else{
    setvalid(true) 
  }
  setfile2(e.file) 
  setloading(false)
  
  try{
    setphoto2(window.URL.createObjectURL(e.file))}
    catch(TypeError){
        return
    }
}
const handleChangep3=(e) =>{
  if (e.file.size>1000000) {
    message.error('Image must smaller than 2MB!');
    setvalid(false)
    return
  }else{
    setvalid(true) 
  }
  setfile3(e.file) 
  setloading(false)
  
  try{
    setphoto3(window.URL.createObjectURL(e.file))}
    catch(TypeError){
        return
    }
}
const handleChangep4=(e) =>{
  if (e.file.size>1000000) {
    message.error('Image must smaller than 2MB!');
    setvalid(false)
    return
  }else{
    setvalid(true) 
  }
  setfile4(e.file) 
  setloading(false)
  
  try{
    setphoto4(window.URL.createObjectURL(e.file))}
    catch(TypeError){
        return
    }
}
  
    const submit=async()=>{
      setloading(true)
      if(valid){
        const fd = new FormData();
        fd.append('image1',file1);
        fd.append('image2',file2);
        fd.append('image3',file3);
        fd.append('image4',file4);
      axios.post('../api/personnel/add_photo/'+state.id,fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }} )
    .then(response => { 
      setloading(false)
     let { from } = { from: { pathname: "./tache",state:state}};
       history.push(from); 
   })
   .catch(error => {
       console.log(error)
   });  
    }}

  return (
    
    <div className="addvoitur">
      {loading?<LoadingPage/> :<></>}
       <br/>
       <Upload 
             maxCount={1}
          {...props1}
          onChange={handleChangep1}>
          <Button icon={<UploadOutlined />}>selectionner une image 1</Button>
          </Upload>
          <br></br>
          <Upload 
             maxCount={1}
          {...props2}
          onChange={handleChangep2}>
          <Button icon={<UploadOutlined />}>selectionner une image 2</Button>
          </Upload>
          <br></br>
          <Upload 
             maxCount={1}
          {...props3}
          onChange={handleChangep3}>
          <Button icon={<UploadOutlined />}>selectionner une image 3</Button>
          </Upload>
          <br></br>
          <Upload 
             maxCount={1}
          {...props4}
          onChange={handleChangep4}>
          <Button icon={<UploadOutlined />}>selectionner une image 4</Button>
          </Upload>
         <Image
             src={photo1}
           />
           <Image
             src={photo2}
           />
           <Image
             src={photo3}
           />
           <Image
             src={photo4}
           />
        <br></br>
         <Button onClick={submit}> Envoyer</Button>
      </div>

   
  );
}


export default Photo;
