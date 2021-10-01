import React,{ useState }from 'react';
import LoadingPage from "../../loading/LoadingPage";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col ,InputGroup,Button, Input } from 'reactstrap';
import classnames from 'classnames';
import {  notification,message,Upload,Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Details.scss';
import axios from'axios';
function Details ()  {
  
 const [state, setState] = useState({})
 
  const [toast, settoast] = useState()
  const handleChange=(e)=> {    
    setState({...state, [e.target.name]: e.target.value,    }) 
  }
  
  
  const handleSubmit=(e)=>{
      e.preventDefault() 
      setloading(true)
      axios.put('/api/auth/update_profile/'+JSON.parse(localStorage.getItem("user")).id,{...state},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(function (response) {
      setloading(false)
      localStorage.setItem("user",JSON.stringify(response.data.data));
        notification[response.data.type]({
          message: 'Update',
          description:
            response.data.message,
        });
    
    }).catch(error => {
     
      console.log(error)
  });  


  }


  const [activeTab, setActiveTab] = useState('1');


  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
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
 
   const props = {
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
  const [loading,setloading]=useState(false);
 const updatephoto=()=>{
 if (valid) {
  setloading(true)
   const fd = new FormData();
   fd.append('photo',photo);
   axios.post("/api/auth/update_profile/"+JSON.parse(localStorage.getItem("user")).id+"?_method=PUT",fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
   .then(response => { 
    setloading(false)
    localStorage.setItem("user",JSON.stringify(response.data.data));
    notification['success']({
     message: "success",
     description:
       'This is the content of the notification.',
   });
  })
  .catch(error => {
    setloading(false)
      notification['warning']({
       message: "warning",
       description:
         'This is the content of the notification.',
     });
  });  
 }else{
   message.error('Image must smaller than 2MB!');
 }   
}

  return (
    <div className="detail">
      {loading?<LoadingPage/> :<></>}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }} 
            style={{color:"black"}}
          >
           Addresse
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            style={{color:"black"}}
          >
            Choisir image
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          style={{color:"black"}}
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Bio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          style={{color:"black"}}
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Tel
          </NavLink>
        </NavItem>
 



      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
            <div className="Details">
      <div className="divtoast" >{toast}</div>
      <InputGroup>
        <Input  type="textarea" className="dinput" name="city"  value={state.city} onChange={handleChange} placeholder="ville" />
      </InputGroup>
      <br />
      <InputGroup>
        <Input  type="textarea" className="dinput" name="state"  value={state.state} onChange={handleChange} placeholder="Gouvernement" />
      </InputGroup>
      <br />
      <InputGroup>
        <Input  type="textarea" className="dinput" name="zip"  value={state.zip} onChange={handleChange} placeholder="Code postal" />
      </InputGroup>
      <br />
      <InputGroup>
        <Input className="dinput" name="current_password" type="password" onChange={handleChange} value={state.current_password} placeholder="Mot de passe" />
      </InputGroup>
      <br/>
     
      <Button className="dbuton" value="editaddress"  onClick={handleSubmit}>Valider</Button>{' '}
    </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col >
            <Image src={imageUrl} width={'50%'} />
            <Upload 
             maxCount={1}
          {...props}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>Selectionner image</Button>
        </Upload>
        <Button className="dbuton"   onClick={updatephoto}>Valider</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col >
            <div className="Details">
      <div className="divtoast" >{toast}</div>
            <InputGroup>
        <Input  type="textarea" className="dinput" name="bio"  value={state.bio} onChange={handleChange} placeholder="Bio" />
      </InputGroup>
      <br />
      <InputGroup>
        <Input className="dinput" name="current_password" type="password" onChange={handleChange} value={state.current_password} placeholder="Mot de passe" />
      </InputGroup>
      <br/>
     
      <Button className="dbuton" value="bio" onClick={handleSubmit}>Valider</Button>
      </div>
      </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col >
            <div className="Details">
           <div className="divtoast" >{toast}</div>
            <InputGroup>
        <Input  type="number" className="dinput" name="tel"  value={state.tel} onChange={handleChange} placeholder="tel" />
        </InputGroup>
        <br />
        <InputGroup>
        <Input className="dinput" name="current_password" type="password"  onChange={handleChange} value={state.current_password} placeholder="Mot de passe" />
         </InputGroup>
        <br/>
     
         <Button className="dbuton" value="phone"  onClick={handleSubmit}>Valider</Button>
          </div>
            </Col>
            
          </Row>
        </TabPane>
      </TabContent>
    </div>
   
  );
}

export default Details;
