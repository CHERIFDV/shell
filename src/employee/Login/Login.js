
import {useState,useEffect}from'react';
import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import {  notification,Modal,Input,Image} from 'antd';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {UserOutlined,SecurityScanOutlined,EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons';
import './Login.scss';
import axios from'axios';
import logo from "./logo.jpg";
import LoadingPage from "../../loading/LoadingPage";
const { confirm } = Modal;
const schema = yup.object().shape({
  username: yup.string().required(),
  Password: yup.string().required(),
});

function Login() {
  const [afpassword,setafpassword]=useState('password');
  const [icons,seticon]=useState(<EyeOutlined/>);
  const changpass=()=>{
    if(afpassword==="password"){
      setafpassword("text")
      seticon(<EyeInvisibleOutlined/>)
    }else{
        setafpassword("password")
        seticon(<EyeOutlined/>)
    }
    

  }
  const navigate = useNavigate();
  const location = useLocation();

    const emp=JSON.parse(localStorage.getItem("emp"))
    const temp=JSON.parse(localStorage.getItem("tokenemp"))
    useEffect(()=>{ 
      if (emp!=null) {
        
    axios.put('/api/auth/logout/'+emp.id,{id:1},{ headers: { Authorization: `Bearer ${temp}` }})
    .then(response => { 

      localStorage.removeItem("tokenemp")
      localStorage.removeItem("emp")
     
   })}
   return ()=>{    
    }
    },[])

  const restarpass=()=>{
    var username=""
    confirm({
      title: 'Votre email :',
      icon: <SecurityScanOutlined />,
      content: <Input type="email" id="inputemailv"  onChange={e=>{username=e.target.value}}/>,
      onOk() {
      
if (document.getElementById("inputemailv").validity.valid) {  
  setloading(true)
  axios.put('/api/personnel/restarpasword/'+username)
        .then(response => { 
          console.log(response.data.status)
          if(response.data.status==true){
            setloading(false)
            notification[response.data.type]({
              message: response.data.type,
              description:"vérifiez votre messagerie pour mettre à jour votre mot de passe"
               ,
            });
          }else{
            notification[response.data.type]({
              message: 'Warning',
              description:response.data.message
               ,
            });
          }
          
       })
       .catch(error => {
           console.log(error)
       });  
      }else{
        notification['warning']({
          message: 'Warning',
          description:"email not valid"
           ,
        });
      }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const [loading,setloading]=useState(false);
  return (
    <>{loading?<LoadingPage/> :<></>}
    <Formik
      validationSchema={schema}
      onSubmit={(value)=>{
        setloading(true)
        axios.post('../api/personnel/login',{email:value.username,password:value.Password})
        .then(response => { 
          setloading(false)
         
          if(response.data.status==true){
            localStorage.setItem("tokenemp",JSON.stringify(response.data.token));
            localStorage.setItem("emp",JSON.stringify(response.data.data));
            let { from } = location.state || { from: { pathname: "/employe" } };
            //navigate(from); 
          }else{
            notification[response.data.type]({
              message: 'Warning',
              description:response.data.message
               ,
            });
          }
          
       })
       .catch(error => {
           console.log(error)
       });  
      }
      }
      initialValues={{
        username: '',
        Password: '',
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
        <Form noValidate  className="Login" onSubmit={handleSubmit}>
          <div className="logo">
          <Image
          width={'100%'}
          src={logo}
        />
              </div>
          <Form.Row>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend"><UserOutlined /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend"><SecurityScanOutlined /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type={afpassword}
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
              
                  isValid={touched.Password && !errors.Password}
                  isInvalid={touched.Password && !!errors.Password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Password}
                </Form.Control.Feedback>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend" onClick={changpass}>{icons}</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>
          </Form.Row>
         
          <Button type="submit">Connexion</Button>

          <div><Link to="/employe/register" style={{textAlign:"center"}}>créer compte</Link> &nbsp;&nbsp;&nbsp;&nbsp;
          <Link onClick={()=>{restarpass()}}>Mot de pass oublier</Link>
          </div>

        </Form>
      )}
    </Formik></>
  );
}


export default Login;
