

import { Button,Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { message,notification,Space ,Image,Spin,Upload} from 'antd';
import { UploadOutlined,SettingOutlined} from '@ant-design/icons';
import LoadingPage from "../loading/LoadingPage";
import { useState,useEffect } from 'react';
import axios from'axios';





const schema = yup.object().shape({
  nom: yup.string().required(),
  addrue: yup.string().required(),
  addloc: yup.string().required(),
  codepostal: yup.string().required(),
  gsm1: yup.string().required(),
  gsm2: yup.string().required(),
  email: yup.string().required(),
  mf: yup.string().required(),
  rib: yup.string().required(),
  timbre: yup.number().required(),
});

function Modifsociete(props) {
  const [loading,setloading]=useState(false);
    const [data,setdata]=useState(null);
    const [photo,setphoto]=useState();
    const [valid,setvalid]=useState(true);
    const [imageUrl,setimageUrl]=useState();
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
   
     const propss = {
      onRemove: file => {
        setimageUrl(null)
        setphoto(null)
        setvalid(false)
      },
      beforeUpload: file => {
        return false;
      },
    }; 
     
    useEffect( ()=>{ 
        const getdata=async()=>{
        const {data}= await axios.get('/api/societe/get_societe',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        console.log(data)
        setdata(data[0])
        
        setimageUrl(data[0].logo)
       }
        getdata()
        return ()=>{
            
      }
      },[])

  
    const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;

  return (


<div style={{textAlign:"center"}}>
{loading?<LoadingPage/> :<></>}
    {data==null ?  <Spin indicator={antIcon} /> : 

<>
     <Image src={imageUrl}/>
     <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        if (valid) {
          setloading(true)
      const fd = new FormData();
      fd.append('name',value.nom);
      fd.append('logo',photo);
      fd.append('adresseRue',value.addrue);
      fd.append('adresseLoc',value.addloc);
      fd.append('adresseCodePostal',value.codepostal);
      fd.append('GSM1',value.gsm1);
      fd.append('GSM2',value.gsm2);
      fd.append('email',value.email);
      fd.append('MF',value.mf);
      fd.append('RIB',value.rib);
      fd.append('timbre',value.timbre);
      axios.post('/api/societe/update_societe/'+data.id+"?_method=PUT",fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       console.log(response)
       notification['success']({
        message: "success",
        description:
          'This is the content of the notification.',
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
    }   
      console.log(value)
      }
      }
      initialValues={{
        nom: data.name,
        addrue: data.adresseRue,
        addloc: data.adresseLoc,
        codepostal: data.adresseCodePostal,
        gsm1: data.GSM1,
        gsm2: data.GSM2,
        email: data.email,
        mf: data.MF,
        rib: data.RIB,
        timbre:data.timbre,
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
        <Form className="ajoute" noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
            <Form.Group controlId="validationFormik101">
              <Form.Label>NOM DE SOCIETE</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isValid={touched.nom && !errors.nom}
                isInvalid={touched.nom && !!errors.nom}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nom}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Address rue</Form.Label>
              <Form.Control
                type="text"
                name="addrue"
                value={values.addrue}
                onChange={handleChange}
                isValid={touched.addrue && !errors.addrue}
                isInvalid={touched.addrue && !!errors.addrue}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.addrue}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Address locale</Form.Label>
              <Form.Control
                type="text"
                name="addloc"
                value={values.addloc}
                onChange={handleChange}
                isValid={touched.addloc && !errors.addloc}
                isInvalid={touched.addloc && !!errors.addloc}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.addloc}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Code Postale</Form.Label>
              <Form.Control
                type="number"
                name="codepostal"
                value={values.codepostal}
                onChange={handleChange}
                isValid={touched.codepostal && !errors.codepostal}
                isInvalid={touched.codepostal && !!errors.codepostal}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.codepostal}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>GSM 1</Form.Label>
              <Form.Control
                type="number"
                name="gsm1"
                value={values.gsm1}
                onChange={handleChange}
                isValid={touched.gsm1 && !errors.gsm1}
                isInvalid={touched.gsm1 && !!errors.gsm1}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.gsm1}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>GSM 2</Form.Label>
              <Form.Control
                type="number"
                name="gsm2"
                value={values.gsm2}
                onChange={handleChange}
                isValid={touched.gsm2 && !errors.gsm2}
                isInvalid={touched.gsm2 && !!errors.gsm2}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.gsm2}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>MF</Form.Label>
              <Form.Control
                type="text"
                name="mf"
                value={values.mf}
                onChange={handleChange}
                isValid={touched.mf && !errors.mf}
                isInvalid={touched.mf && !!errors.mf}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.mf}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>RIB</Form.Label>
              <Form.Control
                type="NUMBER"
                name="rib"
                value={values.rib}
                onChange={handleChange}
                isValid={touched.rib && !errors.rib}
                isInvalid={touched.rib && !!errors.rib}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.rib}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Timbre</Form.Label>
              <Form.Control
                type="NUMBER"
                name="timbre"
                value={values.timbre}
                onChange={handleChange}
                isValid={touched.timbre && !errors.timbre}
                isInvalid={touched.timbre && !!errors.timbre}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.timbre}
                </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
         
       

          <Form.Group>
            
          
          <Upload 
             maxCount={1}
          {...propss}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
          </Upload>
           
          </Form.Group>
          <Button type="submit">Envoyer</Button>
  
         
          
        </Form>
       
      </Space>

      )}
    </Formik></>}</div>
  );
}


export default Modifsociete;
