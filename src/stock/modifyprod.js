import { Button,form,Card,div } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { SettingOutlined } from '@ant-design/icons';
import { Spin,Space,message,Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ajoutproduit.scss';
import React, { useState,useEffect } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";


const schema = yup.object().shape({
  Titre: yup.string().required(),
  Prix: yup.number().required(),
  Tva: yup.number().required(),
  
});


function Register(props) {
  const [reparation,setreparation]=useState(null);
  const [imageUrl,setimageUrl]=useState();
  const [photo,setphoto]=useState();
  const [valid,setvalid]=useState(true);
  const [loading,setloading]=useState(false);
  const handleChangep =(e) =>{ 
    if (e.file.size>100000) {
      message.error('Image must smaller than 2MB!');
      setvalid(false)
      return
    }else{
      setvalid(true) 
    }
    setphoto(e.file) 
    
    if(valid)
    try{
      setimageUrl(window.URL.createObjectURL(e.file))}
    catch(TypeError){
           return
    }
   }
   const { uploading, fileList } = useState;
   const propss = {
    onRemove: file => {
      setimageUrl(null)
      setphoto(null)
      setvalid(false)
    },
    beforeUpload: file => {
      return false;
    },
    photo,
  }; 
  
useEffect( ()=>{ 
  const getdata=async()=>{
  const {data}= await axios.get('/api/reparation/get_rep/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  console.log(data)
  setreparation({Titre:data.designation,Prix:data.price,Tva:data.tva})
  setimageUrl(data.photo)
 }
  getdata()
  return ()=>{
      
}
},[])
const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
  return (
<div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {reparation==null ?  <Spin indicator={antIcon} /> : 
    <Formik style={{textAlign:"left"}}
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{        
      setreparation({Titre:value.Titre,Prix:value.Prix,Tva:value.Tva})
      if (valid) {
        setloading(true)
      const fd = new FormData();
      fd.append('image',photo);
      fd.append('designation',value.Titre);
      fd.append('price',value.Prix);
      fd.append('tva',value.Tva);
      fd.append('type',1);





      axios.post('/api/reparation/update_rep/'+props.match.params.id+"?_method=PUT",fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
     })
     .catch(error => {
         console.log(error)
     });   
    }else{
      message.error('Image must smaller than 2MB!');
    }  
      }
      }
      initialValues={{
         Titre: reparation.Titre,
        Prix: reparation.Prix,
        Tva:reparation.Tva
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
        <form className="ajoute" noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>Titre</span>
              <input
                type="text"
                name="Titre"
                value={values.Titre}
                onChange={handleChange}
                isValid={touched.Titre && !errors.Titre}
                isInvalid={touched.Titre && !!errors.Titre}
              />
               <p type="invalid" tooltip>
                  {errors.Titre}
                </p>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>PRIX</span>
              <div hasValidation>
               


                <input
                  type="number"
                  placeholder="Prix"
                  aria-describedby="inputGroupPrepend"
                  name="Prix"
                  value={values.Prix}
                  onChange={handleChange}
                  isValid={touched.Prix && !errors.Prix}
                  isInvalid={touched.Prix && !!errors.Prix}
                />
                <p type="invalid" tooltip>
                  {errors.Prix}
                </p>
              </div>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>TVA</span>
              <div hasValidation>
                <div>
                </div>
                <input
                  type="number"
                  placeholder="TVA"
                  aria-describedby="inputGroupPrepend"
                  name="Tva"
                  value={values.Tva}
                  onChange={handleChange}
                  isValid={touched.Tva && !errors.Tva}
                  isInvalid={touched.Tva && !!errors.Tva}
                />
                <p type="invalid" tooltip>
                  {errors.Tva}
                </p>
              </div>
            </div>
          </div>
         
       

          <div>
            
          
          <Upload 
             maxCount={1}
          {...propss}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
           
          </div>
          <Button type="submit">Envoyer</Button>
  
         
          
        </form>
        <div className="affiche">

            <Card style={{ width: '15rem' }}>
    <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
      <Card.Title>{reparation.Titre}</Card.Title>
        <Card.Text>
          <ul className="ulliste">
            <li> {reparation.Prix}</li>
            <li> {reparation.Tva}</li>
          </ul>
    
      </Card.Text>
   
      </Card.Body>
      </Card>
         </div>
      </Space>

      )}
    </Formik>}</div>
  );
}


export default Register;
