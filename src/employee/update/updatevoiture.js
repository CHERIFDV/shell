
import React,{ useState,useEffect } from 'react';
import { Button, } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { Formik } from "formik";
import moment from 'moment';
import * as yup from "yup";
import './addvoiture.scss';
import axios from'axios';
import { format } from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
const voiture = yup.object().shape({
  marque: yup.string().required(),
  version: yup.string().required(),
  matricule: yup.string().required(),
  model: yup.string().required(),
  type: yup.string().required(),
  nserie: yup.string().required(),
  codedemarage: yup.string().required(),
  antivolderoues: yup.string().required(),
});


function Register(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [date,setdate]=useState('');
  const [loading,setloading]=useState(false);
  const [data,setdata]=useState('');
  useEffect( ()=>{ 
    const getdata=async()=>{
    const {data}= await axios.get('/api/voiture/get_voiture/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
    setdata(data);
    setdate(data.date_1_er_mise_en_circulation)
   }
    getdata()
    return ()=>{     
  }

  },[])
  return (
    <div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {!data ?  <LoadingPage/>  : 
    <div className="addpub" style={{textAlign:"left"}}>
    <Formik
      validationSchema={voiture}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
       
        axios.put('/api/voiture/update_voiture/'+props.match.params.id,{
          marque:value.marque,
          serie:value.nserie,
          model:value.model,
          version:value.version,
          type:value.type,
          num_immatriculation:value.matricule,
          date_1_er_mise_en_circulation:format(new Date(date),'yyyy/MM/dd'),
          code_demarrage:value.codedemarage,
          antivol_roues:value.antivolderoues,
         },{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       let { from } =  { from: { pathname: "../"}};
       navigate(from); 
     })
     .catch(error => {
         console.log(error)
     });  
    }
      }
      initialValues={{
        marque:data.marque,
        version: data.version,
        matricule:  data.num_immatriculation,
        model:data.model,
        type:data.type,
        nserie:data.serie,
        codedemarage:data.code_demarrage,
        antivolderoues:data.antivol_roues,
        date_1_er_mise_en_circulation:date,
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
   
        <form className="addvoitur" noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>Marque</span>
              <input
                type="text"
                name="marque"
                value={values.marque}
                onChange={handleChange}
                isValid={touched.marque && !errors.marque}
                isInvalid={touched.marque && !!errors.marque}
              />
              
            </div>
            <div controlId="validationFormik102">
              <span>Model</span>
              <input
                type="text"
                name="model"
                value={values.model}
                onChange={handleChange}
                isValid={touched.model && !errors.model}
                isInvalid={touched.model && !!errors.model}
              />

             
            </div>
            <div controlId="validationFormik102">
              <span>Version</span>
              <input
                type="text"
                name="version"
                value={values.version}
                onChange={handleChange}
                isValid={touched.version && !errors.version}
                isInvalid={touched.version && !!errors.version}
              />

             
            </div>
            <div controlId="validationFormik102">
              <span>Type</span>
              <input
                type="text"
                name="type"
                value={values.type}
                onChange={handleChange}
                isValid={touched.type && !errors.type}
                isInvalid={touched.type && !!errors.type}
              />

             
            </div>
            <div controlId="validationFormik102">
              <span>date_1_er_mise_en_circulation:</span>
              <DatePicker
              name="date_1_er_mise_en_circulation"
              defaultValue={moment(data.date_1_er_mise_en_circulation, 'YYYY/MM/DD')}
              onChange={date => setdate(date._d)}
              
              />

             
            </div>
            <div controlId="validationFormik102">
              <span>N de Serie</span>
              <input
                type="text"
                name="nserie"
                value={values.nserie}
                onChange={handleChange}
                isValid={touched.nserie && !errors.nserie}
                isInvalid={touched.nserie && !!errors.nserie}
              />

             
            </div>
            <div  controlId="validationFormikUsername2">
              <span>N° D’IMMATRICULATION :</span>
              <div hasValidation>
              
                <input
                  type="text"
                  placeholder="Matricule"
                  aria-describedby="inputGroupPrepend"
                  name="matricule"
                  value={values.matricule}
                  onChange={handleChange}
                  isValid={touched.matricule && !errors.matricule}
                  isInvalid={touched.matricule && !!errors.matricule}
                />
                <p type="invalid" tooltip>
                  {errors.matricule}
                </p>
              </div>
            </div>


            <div  controlId="validationFormikUsername2">
              <span>CODE DÉMARRAGE :</span>
              <div hasValidation>
                <input
                  type="text"
                  placeholder="Model"
                  aria-describedby="inputGroupPrepend"
                  name="codedemarage"
                  value={values.codedemarage}
                  onChange={handleChange}
                  isValid={touched.codedemarage && !errors.codedemarage}
                  isInvalid={touched.codedemarage && !!errors.codedemarage}
                />
                <p type="invalid" tooltip>
                  {errors.codedemarage}
                </p>
              </div>
            </div>

          </div>
          <div>
          <div  controlId="validationFormik103">
              <span>ANTIVOL DE ROUES :</span>
              <input
                type="number"
                placeholder="ANTIVOL DE ROUES "
                name="antivolderoues"
                value={values.antivolderoues}
                onChange={handleChange}
         
                isValid={touched.antivolderoues && !errors.antivolderoues}
                isInvalid={touched.antivolderoues && !!errors.antivolderoues}
              />

          
            </div>
          
                
          </div>
          <Button type="submit">Envoyer</Button>
        </form>
      )}
    </Formik></div>}</div>
  );
}


export default Register;
