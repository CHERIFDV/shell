

import { Button,Form} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { notification, message,Space,Image,Avatar ,Card,Upload } from 'antd';
import { UploadOutlined  } from '@ant-design/icons';
import './addpub.scss';
import { useState } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";
const { Meta } = Card;

const schema = yup.object().shape({
    titre: yup.string().required(),
    description: yup.string().required(),
});

function Addpub() {
  
  const [titre,settitre]=useState("");
  const [description,setdescription]=useState("");
  const [photo1,setphoto1]=useState();
  const [photo2,setphoto2]=useState();
  const [valid,setvalid]=useState(true);
  const [file1,setfile1]=useState();
  const [file2,setfile2]=useState();
 
  const [loading,setloading]=useState(false);
   
  const handleChangep=(e) =>{ 
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
   const props = {
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
  


  return (
    <div className="addpub">
{loading?<LoadingPage/> :<></>}
    <Formik
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        settitre(value.titre);
        setdescription(value.description);
        if (valid) {
          setloading(true)
        
        const fd = new FormData();
       fd.append('image1',file1);
       fd.append('image2',file2);
       fd.append('id_admin',2);
       fd.append('titre',value.titre);
       fd.append('description',value.description);
       
       axios.post('/api/pub/add_pub',fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
       .then(response => { 
        setloading(false)
        value.titre=null
        resetForm({values:""})
        notification['success']({
          message: response.data.message ? 'success' :'warning',
          description:
          response.data.message,
        });
      })
      .catch(error => {
          console.log(error)
          notification['warning']({
            message: "warning",
            description:
              'This is the content of the notification.',
          });
      });     
      }else{
        message.error('Image must smaller than 2MB!');
      }}
      }
      initialValues={{
        titre: titre,
        description: description,
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
        <Form  noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Titre:</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={values.titre}
                onChange={handleChange}
                isValid={touched.titre && !errors.titre}
                isInvalid={touched.titre && !!errors.titre}
              />
             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Description:</Form.Label>
            
              
            </Form.Group>
           
            <textarea
                type="textarea"
                name="description"
               
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && !!errors.description}
                
              />
          </Form.Row>
         

          <Form.Group style={{display:'flex'}}>
          <Upload 
             maxCount={1}
          {...props}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
          </Upload>
          <Upload 
             maxCount={1}
          {...props1}
          onChange={handleChangep2}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
          </Form.Group>
         
        
          <Button type="submit"  >Envoyer</Button>
  
         
          
        </Form>
       
      </Space>

      )}
      
    </Formik>
    <div className="affiche">
    <Card 
    cover={
        <Image.PreviewGroup className="espace">
        <Image
          width={'400px'}
          height={"300px"}
          src={photo1}
        />
        <Image
         width={'400px'}
         height={"300px"}
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
      </div>
  );
}


export default Addpub;
