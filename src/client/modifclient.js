

import { Button, } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { Spin, message,Space  } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './addclient.scss';
import { useState,useEffect } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};






const schema = yup.object().shape({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  cin: yup.number().required(),
  tel: yup.number().required(),
});


function Modifclient(props) {
    const [client,setclient]=useState(null);
    const [loading,setloading]=useState(false);
    useEffect( ()=>{ 
        const getdata=async()=>{
        const {data}= await axios.get('/api/client/get_client/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        
        setclient({nom:data[0].nom,prenom:data[0].prenom,cin:data[0].cin,tel:data[0].tel})
       }
        getdata()
        return ()=>{
            
      }
      },[])




      const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
  return (
    <div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {client==null ?  <Spin indicator={antIcon} /> : 
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
      axios.put('/api/client/update_client/'+props.match.params.id,{nom:value.nom,prenom:value.prenom,cin:value.cin,tel:value.tel},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       console.log(response)
     })
     .catch(error => {
      setloading(false)
     });     
      console.log(value)
      }
      }
      initialValues={{
        nom:client.nom,
        prenom:client.prenom,
        cin:client.cin,
        tel:client.tel,
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
        <form className="ajouteclient" noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>Nom</span>
              <input
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isValid={touched.nom && !errors.nom}
                isInvalid={touched.nom && !!errors.nom}
              />
               <p type="invalid" tooltip>
                  {errors.nom}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Prenom</span>
              <input
                type="text"
                name="prenom"
                value={values.prenom}
                onChange={handleChange}
                isValid={touched.prenom && !errors.prenom}
                isInvalid={touched.prenom && !!errors.prenom}
              />
               <p type="invalid" tooltip>
                  {errors.prenom}
                </p>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>CIN</span>
              <div hasValidation>
                <input
                  type="number"
                  placeholder="CIN"
                  aria-describedby="inputGroupPrepend"
                  name="cin"
                  value={values.cin}
                  onChange={handleChange}
                  isValid={touched.cin && !errors.cin}
                  isInvalid={touched.cin && !!errors.cin}
                />
                <p type="invalid" tooltip>
                  {errors.cin}
                </p>
              </div>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>TEL</span>
              <div hasValidation>
                <div>
                </div>
                <input
                  type="number"
                  placeholder="tel"
                  aria-describedby="inputGroupPrepend"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
                  isValid={touched.tel && !errors.tel}
                  isInvalid={touched.tel && !!errors.tel}
                />
                <p type="invalid" tooltip>
                  {errors.tel}
                </p>
              </div>
            </div>
          </div>
         
       

          <div>
            
          
        
           
          </div>
          <Button type="submit">Envoyer</Button>
  
         
          
        </form>
      </Space>

      )}
    </Formik>}</div>
  );
}


export default Modifclient;
