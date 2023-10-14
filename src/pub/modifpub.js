

import { Button,form} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import {  message,Space,Image,Avatar ,Card,Upload } from 'antd';
import { UploadOutlined  } from '@ant-design/icons';
import LoadingPage from "../loading/LoadingPage";
import './addpub.scss';
import { useState,useEffect } from 'react';
import axios from'axios';
const { Meta } = Card;
const schema = yup.object().shape({
    titre: yup.string().required(),
    description: yup.string().required(),
});

function Modifierpub(props) {
  const [titre,settitre]=useState("");
  const [description,setdescription]=useState("");
  const [photo1,setphoto1]=useState();
  const [photo2,setphoto2]=useState();
  const [loading,setloading]=useState(false);
  const [valid,setvalid]=useState(true);
  const [file1,setfile1]=useState();
  const [file2,setfile2]=useState();
 

  useEffect( ()=>{ 
    const getdata=async()=>{
    const {data}= await axios.get('/api/pub/get_pub/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    console.log(data)
    settitre(data.titre);
    setdescription(data.description);
    setphoto1(data.photo1);
    setphoto2(data.photo2);
   }
    getdata()
    return ()=>{
        
  }
  },[])




  
   
  const handleChangep=(e) =>{ 
    if (e.file.size>100000) {
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
   const propss = {
    onRemove: file => {
      setfile1(null)
      setphoto1(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
  const props1 = {
    onRemove: file => {
      setfile2(null)
      setphoto2(null)
    },
    beforeUpload: file => {
     
      return false;
    },
    file1,
  }; 
const handleChangep2=(e) =>{



  console.log(e.file)
  if (e.file.size>100000) {
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
 
  
  
  

  return (
    <div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {!description ?  <LoadingPage/>  : 
    <div className="addpub" style={{textAlign:"left"}}>

    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        settitre(value.titre);
        setdescription(value.description); 
        if (valid) {

        setloading(true)
        const fd = new FormData();
       fd.append('image1',file1);
       fd.append('id_admin',2);
       fd.append('titre',value.titre);
       fd.append('description',value.description);
       fd.append('image2',file2);
       fd.append('_method', 'PUT')
       axios.post('/api/pub/update_pub/'+props.match.params.id+"?_method=PUT",fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
       .then(response => { 
        setloading(false)
        resetForm({values:""})
      })
      .catch(error => {
          
      });  
    }else{
      message.error('Image must smaller than 2MB!');
    }   
      }
      }
      initialValues={{
         description: description,
        titre: titre,
       
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Space size={[18, 16]} wrap>
        <form  noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>Titre</span>
              <input
                type="text"
                name="titre"
                value={values.titre}
                onChange={handleChange}
                isValid={touched.titre && !errors.titre}
                isInvalid={touched.titre && !!errors.titre}
              />
             
            </div>
            <div controlId="validationFormik102">
              <span>Description:</span>
             
              
            </div>
            <textarea
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && !!errors.description}
                
              />
           
           
          </div>
         

          <div>
          <Upload 
             maxCount={1}
          {...propss}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
          </Upload>
          <Upload 
             maxCount={1}
          {...props1}
          onChange={handleChangep2}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
          </div>
         
        
          <Button type="submit"  >Envoyer</Button>
  
         
          
        </form>
       
      </Space>

      )}
      
    </Formik>
    <div className="affiche">
    <Card 
    cover={
        <Image.PreviewGroup className="espace">
        <Image
          width={'100%'}
          src={photo1}
        />
        <Image
          width={'100%'}
          src={photo2}
        />
        </Image.PreviewGroup>
    }
    actions={[
     
      
    ]}
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={titre}
      description={description}
    />
   
  </Card>
      </div>
      </div>}</div>
  );
}


export default Modifierpub;
