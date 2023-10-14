import React, { useState } from 'react';
import { Button,Nav, NavItem, form, FormGroup, Label, Input } from 'reactstrap';
import LoadingPage from "../loading/LoadingPage";
import axios from'axios';
import {notification} from 'antd';
import './contact.scss';

function Contact (){
  const [loading,setloading]=useState(false);
  const [state, setState] = useState({nom:'',email:'',tel:'',description:''})
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value,    })  
   
  }
    const handleSubmit= (e) =>{
      e.preventDefault();
      var letters = /^[0-9a-z A-Z]+$/;
      if(state.nom.match(/^[a-z A-Z]+$/)&&state.description.match(letters)){
        setloading(true)
       axios.post('/api/contact/add_contact',{...state})
       .then(response => { 
        state.email=''
        state.nom=""
        state.tel=""
        state.description=""
        setloading(false)
        notification["success"]({
          description:"Ajouter avec "
           ,
        });
         })
        .catch(error => {
          notification["warning"]({
            message: 'Warning',
            description:"vérifiez votre messagerie pour mettre à jour votre mot de passe"
             ,
          });
          setloading(false)
        });  
       }else{
        notification["warning"]({
          message: 'Warning',
          description:""
        });
      }  
    }
         return(
   <div className="Contact">
     {loading?<LoadingPage/> :<></>}
<Nav >
        <NavItem>
        <form className="formc" >
      <FormGroup>
        <Label for="Name">Nom et Prenom</Label>
        <Input type="text"  minlength="3" maxlength="20" name="nom" id="Name" placeholder="votre nom et prenom ..."  value={state.nom} onChange={handleChange}/>
     
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="Email" placeholder="votre email ..."  value={state.email} onChange={handleChange} />

        <Label for="phone">Tel</Label>
        <Input type="text" name="tel" minlength="8" maxlength="20" id="phone" placeholder="votre tel "  value={state.tel} onChange={handleChange}/>
      
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" name="description" value={state.description} onChange={handleChange} />
      </FormGroup>
      <Button   variant="primary" onClick={handleSubmit} type="submit">Envoyer</Button>
    </form>
        </NavItem>
        <NavItem>
        <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >


            
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6470.122818615721!2d10.570219!3d35.822969!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc3b7d82ec3b7d3ea!2sJedAuto!5e0!3m2!1sfr!2stn!4v1622721862534!5m2!1sfr!2stn"
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div>
        </NavItem>
        
      </Nav>
       </div>
    
         )
}

export default Contact;