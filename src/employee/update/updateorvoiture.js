

import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import './addvoiture.scss';
import LoadingPage from "../../loading/LoadingPage";
import React,{ useState,useEffect } from 'react';
import axios from'axios';
import moment from 'moment';
import { Select ,DatePicker} from 'antd';
import { format } from 'date-fns';
const { Option } = Select;

const schema = yup.object().shape({

  codemoteur: yup.string().required(),
  niveaudecardurent: yup.string().required(),
  
  km: yup.number().required(),
  FÊLURE: yup.bool().required(),
  CASSURE: yup.bool().required(),
  ÉCLAT: yup.bool().required(),
  D: yup.bool().required(),
  G: yup.bool().required(),
  FAVD: yup.bool().required(),
  FAVG: yup.bool().required(),
  FARD: yup.bool().required(),
  FARG: yup.bool().required(),
  PAVD: yup.number().required(),
  PAVG: yup.number().required(),
  PARD: yup.number().required(),
  PARG: yup.number().required(),


});


function ORvoiture(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = props.location;
  const [loading,setloading]=useState(false);
  const [data,setdata]=useState('');
  useEffect( ()=>{ 
    const getdata=async()=>{
    const {data}= await axios.get('/api/personnel/or/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
    setdate(data.validation_controle_tech)
    setdata(data);
    setnc(data.niveau_carburant)
   }
    getdata()
    return ()=>{
        
  }
  },[])

  const emp=JSON.parse(localStorage.getItem("emp"))
  const [date,setdate]=useState("");
  const [nc, setnc] = useState("select");
  return (
    <div style={{textAlign:"center"}}>
    {!data ?  <LoadingPage/>  : 
    <div className="addpub" style={{textAlign:"left"}}>
    {loading?<LoadingPage/> :<></>}
    <Formik
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
        axios.post('/api/personnel/UPDATE_ordreRep/'+props.match.params.id,
        {
          niveau_carburant:nc,
          validation_controle_tech:format(new Date(date),'yyyy/MM/dd'),
          pneum_AVD:value.PAVD,
          pneum_AVG:value.PAVG,
          pneum_ARD:value.PARD,
          pneum_ARG:value.PARG,
          pare_brise_FELURE:value.FÊLURE,
          pare_brise_CASSURE:value.CASSURE,
          pare_brise_ECLAT:value.ÉCLAT,
          phare_D:value.D,
          phare_G:value.G,
          feux_AVD:value.FAVD,
          feux_AVG:value.FAVG,
          feux_ARD:value.FARD,
          feux_ARG:value.FARG,
          code_moteur:value.codemoteur,
          KM:value.km,
        },{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       console.log(response)
       let { from } = { from: { pathname: "../tacheorup",state:{id:response.data[0],pare_brise_FELURE:value.FÊLURE,
        pare_brise_CASSURE:value.CASSURE,
        pare_brise_ECLAT:value.ÉCLAT,
        phare_D:value.D,
        phare_G:value.G,
        feux_AVD:value.FAVD,
        feux_AVG:value.FAVG,
        feux_ARD:value.FARD,
        feux_ARG:value.FARG}}};
       navigate(from); 
     })
     .catch(error => {
         console.log(error)
     });  
     
    }
      }
      initialValues={{
      codemoteur: data.code_moteur,
      niveaudecardurent:nc,
      km: data.KM,
      FÊLURE: data.pare_brise_FELURE==1?true:false,
      CASSURE: data.pare_brise_CASSURE==1?true:false,
      ÉCLAT:data.pare_brise_ECLAT==1?true:false,
      D: data.phare_D==1?true:false,
      G: data.phare_G==1?true:false,
      FAVD: data.feux_AVD==1?true:false,
      FAVG: data.feux_AVG==1?true:false,
      FARD: data.feux_ARD==1?true:false,
      FARG: data.feux_ARG==1?true:false,
      PAVD: data.pneum_AVD,
      PAVG:data.pneum_AVG,
      PARD: data.pneum_ARD,
      PARG:data.pneum_ARG,
      validect:date,
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
        <Form className="addvoitur" noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group  controlId="validationFormik103">
              <Form.Label>CODE MOTEUR :</Form.Label>
              <Form.Control
                type="number"
                placeholder="CODE MOTEUR :"
                name="codemoteur"
                value={values.codemoteur}
                onChange={handleChange}
                isValid={touched.codemoteur && !errors.codemoteur}
                isInvalid={touched.codemoteur && !!errors.codemoteur}
              />
            </Form.Group>
            <Form.Group  controlId="validationFormik103">
              <Form.Label>NIVEAU DE CARBURANT :</Form.Label>
              <Select
               name="niveaudecardurent"

               onChange={e=>setnc(e)}
               value={nc}
                   onBlur={handleBlur}
                   label={"NIVEAU DE CARBURANT"}
                  style={{ display: 'block' }}
                 >
                 <option value="1/4" label="1/4" >1/4</option>
                 <option value="1/2" label="1/2" >1/2</option>
                 <option value="3/4" label="3/4" >3/4</option>
                 <option value="p" label="P" >P</option>
                 </Select> 
                  {errors.niveaudecardurent &&
                   touched.niveaudecardurent &&
                  <div className="input-feedback" style={{color:'red'}}>
                  {'required field'}
                   </div>}
           
            </Form.Group>
            
            <Form.Group controlId="validationFormik102">
              <Form.Label>VALIDITÉ DU CONTRÔLE TECHNIQUE:</Form.Label>
              <DatePicker
              name="validect"
              defaultValue={moment(data.validation_controle_tech, 'YYYY/MM/DD')}
              onChange={date => setdate(date._d)}
              
              />

             
            </Form.Group>
            <Form.Group  controlId="validationFormik105">
              <Form.Label>KM :</Form.Label>
              <Form.Control
                type="text"
                placeholder="KM"
                name="km"
                value={values.km}
                onChange={handleChange}
                isValid={touched.km && !errors.km}
                isInvalid={touched.km && !!errors.km}
          
              />
            </Form.Group>

            <Form.Group  controlId="validationFormik105">
              <Form.Label>PNEUMATIQUES</Form.Label>
              <Form.Control
                type="text"
                placeholder="AVD"
                name="PAVD"
                value={values.PAVD}
                onChange={handleChange}
                isValid={touched.PAVD && !errors.PAVD}
                isInvalid={touched.PAVD && !!errors.PAVD}
          
              />
               <Form.Control
                type="text"
                placeholder="AVG"
                name="PAVG"
                value={values.PAVG}
                onChange={handleChange}
                isValid={touched.PAVG && !errors.PAVG}
                isInvalid={touched.PAVG && !!errors.PAVG}
          
              />
               <Form.Control
                type="text"
                placeholder="ARD"
                name="PARD"
                value={values.PARD}
                onChange={handleChange}
                isValid={touched.PARD && !errors.PARD}
                isInvalid={touched.PARD && !!errors.PARD}
          
              />
               <Form.Control
                type="text"
                placeholder="ARG"
                name="PARG"
                value={values.PARG}
                onChange={handleChange}
                isValid={touched.PARG && !errors.PARG}
                isInvalid={touched.PARG && !!errors.PARG}
          
              />
            </Form.Group>
            <Form.Group  controlId="validationFormik105">
              <Form.Label>FEUX</Form.Label>
              <Form.Check
              required
              label="AVD"
                name="FAVD"
                checked={values.FAVD}
                value={values.FAVD}
                onChange={handleChange}
                isValid={touched.FAVD && !errors.FAVD}
                isInvalid={touched.FAVD && !!errors.FAVD}
          
              />
               <Form.Check
              required
              label="AVG"
                name="FAVG"
                checked={values.FAVG}
                value={values.FAVG}
                onChange={handleChange}
                isValid={touched.FAVG && !errors.FAVG}
                isInvalid={touched.FAVG && !!errors.FAVG}
          
              />
               <Form.Check
              required
              label="ARD"
                name="FARD"
                checked={values.FARG}
                value={values.FARD}
                onChange={handleChange}
                isValid={touched.FARD && !errors.FARD}
                isInvalid={touched.FARD && !!errors.FARD}
          
              />
               <Form.Check
              required
              label="ARG"
                name="FARG"
                checked={values.FARG}
                value={values.FARG}
                onChange={handleChange}
                isValid={touched.FARG && !errors.FARG}
                isInvalid={touched.FARG && !!errors.FARG}
          
              />
            </Form.Group>


            <Form.Group  controlId="validationFormik105">
              <Form.Label>PARE-BRISE</Form.Label>
              <Form.Check
              required
              label="FÊLURE"
                name="FÊLURE"
                checked={values.FÊLURE}
                value={values.FÊLURE}
                onChange={handleChange}
                isValid={touched.FÊLURE && !errors.FÊLURE}
                isInvalid={touched.FÊLURE && !!errors.FÊLURE}
          
              />
               <Form.Check
              required
              label="CASSURE"
                name="CASSURE"
                checked={values.CASSURE}
                value={values.CASSURE}
                onChange={handleChange}
                isValid={touched.CASSURE && !errors.CASSURE}
                isInvalid={touched.CASSURE && !!errors.CASSURE}
          
              />
               <Form.Check
              required
              label="ÉCLAT"
                name="ÉCLAT"
                checked={values.ÉCLAT}
                value={values.ÉCLAT}
                onChange={handleChange}
                isValid={touched.ÉCLAT && !errors.ÉCLAT}
                isInvalid={touched.ÉCLAT && !!errors.ÉCLAT}
          
              />
              
            </Form.Group>
            <Form.Group  controlId="validationFormik105">
              <Form.Label>PHARE</Form.Label>
              <Form.Check
              required
              label="D"
                name="D"
                checked={values.D}
                value={values.D}
                onChange={handleChange}
                isValid={touched.D && !errors.D}
                isInvalid={touched.D && !!errors.D}
              />
               <Form.Check
                required
                label="G"
                name="G"
                checked={values.G}
                value={values.G}
                onChange={handleChange}
                isValid={touched.G && !errors.G}
                isInvalid={touched.G && !!errors.G}
          
              />
                
            </Form.Group>
           
          </Form.Row>
   
          <Button type="submit">Envoyer</Button>
        </Form>
    
      )}
    </Formik></div>}</div>
  );
}


export default ORvoiture;
