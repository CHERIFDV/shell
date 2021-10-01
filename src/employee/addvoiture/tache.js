
import React,{Component}from'react';
import { Button} from 'react-bootstrap';
import { Table } from 'reactstrap';

import { SettingOutlined } from '@ant-design/icons';
import { Select ,notification} from 'antd';
import LoadingPage from "../../loading/LoadingPage";
import {MinusCircleOutlined } from '@ant-design/icons';
import './tache.scss';
import axios from'axios';
const { Option } = Select;
const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type,
      description:
        'This is the content of the notification.',
    });
  };

 class Tache extends Component{
 constructor (props) {
  super(props);
  const { state } = props.location
  console.log(state)
   let b=[]
   let tb=[]
    if(state.feux_ARD){
      b.push({num:tb.length,description:"Feux ARD"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Feux ARD</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
      
    }
    if(state.feux_ARG){
      b.push({num:tb.length,description:"Feux ARG"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Feux ARG</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    if(state.feux_AVD){
      b.push({num:tb.length,description:"Feux AVD"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Feux AVD</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    if(state.feux_AVG){
      b.push({num:tb.length,description:"Feux AVG"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Feux AVG</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    if(state.pare_brise_CASSURE){
      b.push({num:tb.length,description:"Pare Brise CASSURE"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Pare Brise CASSURE</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }

    if(state.pare_brise_ECLAT){
      b.push({num:tb.length,description:"Pare brise ECLAT"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Pare Brise ECLAT</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    if(state.pare_brise_FELURE){
      b.push({num:tb.length,description:"Pare brise FELURE"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Pare Brise FELURE</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }

    if(state.phare_D){
      b.push({num:tb.length,description:"Phare G"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Phare G</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    if(state.phare_G){
       b.push({num:tb.length,description:"Phare G"})
      tb.push(
        <tr id={(tb.length)+"e"}>
        <td>Phare G</td>
        <td><MinusCircleOutlined onClick={this.deletelement} id={tb.length}/></td>
        </tr>)
    }
    

  this.state = {
    tab:b,
    or:state.id,
    nomDesignation:"select",
    B:['VIDANGE MOTEUR ','VIDANGE BOÎTE','VIDANGE PONT AV AR','FILTRE À AIR','FILTRE À HUILE','FILTRE À CARBURANT','FILTRE D’HABITACLE','LIQUIDE DE FREIN','LIQUIDE DE REFROIDISSEMENT','EQUILIBRAGE ROUES','PNEUS AV','PNEUS AR','CONTRÔLE NIVEAUX ','ENTRETIEN CLIMATISATION','BALAIS ESSUIE-GLACE','ECLAIRAGE ','OBD','BOUGIES'],
    afficherep:tb,
    nb:tb.length,
    refselected:"",
    desselected:"",
    data:[],
    voiture:[],
    client:"",
    model:"",
    voiture_id:null,
    loading:false,
  }
   
};
 

   onChanger=(value)=> {
    
     this.setState({
      ref:value
    })
   
  }
    onChanged=(value)=> {
     this.setState({
      nomDesignation:value,
    })
  }

    onBlur=(e)=> {
      document.getElementById("Designation").value =this.state.nomDesignation;
     }

    onFocus=()=> {
      console.log("val")
    }

    onSearch=(val)=> {
      if(val!=""){
      this.setState({
        nomDesignation:val,
        
      })}
  }
  


    ta;
    b;
    deletelement=(e)=>{
    document.getElementById(e.currentTarget.id+"e").remove()
    var n=e.currentTarget.id
    var t=[];
    for(var i = 0; i < this.state.tab.length; i++){
      if(this.state.tab[i].num != n){
         t.push(this.state.tab[i])
      }

    }
    this.setState({
      tab:t
    })
     
     
    }
  

      affichetab=()=>{
      console.log(this.state.tab)
        if (!this.state.tab.length) {
          notification['warning']({
            message: "warning",
            description:
              'facture vide',
          });
        }else{
          this.setState({
            loading:true,
            
          })
        axios.post('../api/personnel/add_tache',{tache:this.state.tab,or_id:this.state.or},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        this.setState({
          loading:false,
          
        })
       notification['success']({
        message: "success",
        description:
          'Query Successfully Send',
      });
      this.props.history.push('./');
      
     })
       }
    }
   add=()=>{
  
       
        if (this.state.nomDesignation===""||this.state.nomDesignation==="select") {
         openNotificationWithIcon('error')
        }else{
          
         this.ta={
         num:this.state.nb,
         description:this.state.nomDesignation,
        };
    this.setState({
      tab:[...this.state.tab,this.ta]
    })      
             this.b=(
            <tr id={(this.state.nb)+"e"}>
            <td>{this.state.nomDesignation}</td>
            <td><MinusCircleOutlined onClick={this.deletelement} id={this.state.nb}/></td>
            </tr>)
            this.setState({
              afficherep:[...this.state.afficherep,this.b]
            })
        }
        this.setState({
          nb:this.state.nb+1,
          nomDesignation:"select",
        })
}

      

 render(){
  const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
  
  
  return (
<div style={{textAlign:"center"}}>
{this.state.loading?<LoadingPage/> :<></>}
         <div className="tache">
       
         <Table responsive>
      <thead>
        <tr>
          <th>Designation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          
       {this.state.afficherep}
        <tr>
          <td>{  <Select
                 id="Designation"
                 value={this.state.nomDesignation}
               showSearch
               style={{ width:"100%" }}
               placeholder="Select"
               optionFilterProp="children"
               onChange={this.onChanged}
                onFocus={this.onFocus}
               onBlur={this.onBlur}
               onSearch={this.onSearch}
               filterOption={(input, option) =>
               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
                >{ 
                    this.state.B.map(function(item, i){
                    return <Option value={item}>{item}</Option>
                     })
                     }
              
              
              </Select>}</td>
         
          <td><button onClick={this.add} >Add</button></td>
        </tr>
      </tbody>
    </Table>
          <Button type="submit" onClick={this.affichetab}>Envoyer</Button>
          <p>{}</p>
          </div></div>
  );
}
 }
 


export default Tache;