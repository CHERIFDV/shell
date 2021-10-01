
import React,{Component}from'react';
import { Button} from 'react-bootstrap';
import { Table } from 'reactstrap';


import { Select ,InputNumber,notification} from 'antd';
import LoadingPage from "../loading/LoadingPage";
import {MinusCircleOutlined,EditOutlined } from '@ant-design/icons';
import './factdiv.scss';
import axios from'axios';
const { Option } = Select;

const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'réussite',
    });
  };





 class Factdiv extends Component{

 constructor (props) {

  super(props);
  
  
  this.state = {
    tab: [],
    ref:"",
    nomDesignation:"select",
    Designation : "",
    afficherep:[],
    nb:0,
    refselected:"",
    desselected:"",
    Remise:0,
    Qte:1,
    Tva:0,
    Prix:0,
    data:[],
    voiture:[],
    client:"",
    model:"",
    voiture_id:null,
  }
  
  
  
  

};
componentDidMount() {

 const get_reparation=async()=>{ 
    const {data}= await axios.get('/api/reparation/get_rep',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    this.setState({
      data:data
    }) 
  }
  const get_client=async()=>{ 
    const {data}= await axios.get('/api/voiture/get_voiture',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    this.setState({
      voiture:data
    })
   
  }
  get_reparation();
  get_client();

}

 

   onChanger=(value)=> {
    
     this.setState({
      ref:value
    })
   





    
  }
    onChanged=(value)=> {
     
     this.setState({
      nomDesignation:this.state.data[value].designation,
      Designation:this.state.data[value].id,
      Tva:this.state.data[value].tva,
      Prix:this.state.data[value].price,
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
        Designation:null
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
      if (this.state.voiture_id==null) {
        notification['warning']({
          message: "erreur",
          description:
            'voiture non selectionnée',
        });
      }else{
        if (!this.state.tab.length) {
          notification['warning']({
            message: "erreur",
            description:
              'facture vide',
          });
        }else{
          this.setState({
            loading:true,
            
          })
      axios.post('/api/fact/add_fact',{fact_num:3,client_id:this.state.client,voiture_id:this.state.voiture_id,societe_id:1,details:this.state.tab},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        this.setState({
          loading:false,
          
        })
       notification['success']({
        message: "reussite",
        description:
          'facture ajoutée.',
      });
     })
     .catch(error => {
         console.log(error.response)
         notification['warning']({
          message: "erreur",
          description:
            'Il ya un problème quelque part',
        });
     });  }}
    }
   add=()=>{
  var remise=document.getElementById("remise").value;
  var qte=document.getElementById("qte").value
  var tva=document.getElementById("tva").value
  var prix=document.getElementById("prix").value
         if (this.state.ref==="") {
         openNotificationWithIcon('error')
        }else{
        if (this.state.nomDesignation===""||this.state.nomDesignation==="select") {
         openNotificationWithIcon('error')
        }else{
          if (remise<0||remise>100||remise==="") {
            openNotificationWithIcon('error')
           }else{
            if (qte<=0||qte>100||qte==="") {
              openNotificationWithIcon('error')
             }else{
              if (tva<0||tva>100||tva==="") {
                openNotificationWithIcon('error')
               }else{
         openNotificationWithIcon('success')
         if (prix<=0||prix==="") {
          openNotificationWithIcon('error')
         }else{
         this.ta={
         num:this.state.nb,
         designation:this.state.nomDesignation,
         ref:this.state.ref,
         iddesignation:this.state.Designation,
         remise:this.state.Remise,
         Qte:this.state.Qte,
         tva:this.state.Tva,
         Prix:this.state.Prix,
         type:1,
    };
    this.setState({
      tab:[...this.state.tab,this.ta]
    })      

         
             this.b=(
            <tr id={(this.state.nb)+"e"}>
            <td>{this.state.ref}</td>
            <td>{this.state.nomDesignation}</td>
            <td>{document.getElementById("prix").value}</td>
            <td>{document.getElementById("remise").value}</td>
            <td>{document.getElementById("qte").value}</td>
            <td>{document.getElementById("tva").value}</td>
            <td><MinusCircleOutlined onClick={this.deletelement} id={this.state.nb}/> &nbsp;&nbsp;<EditOutlined onClick={this.modifay} id={this.state.nb} /></td>
            </tr>)
            this.setState({
              afficherep:[...this.state.afficherep,this.b]
            })
           
        }}}}}}
        this.setState({
          nb:this.state.nb+1,
          nomDesignation:"select",
          Designation:"",
          Tva:"",
          Prix:"",
          ref:""
        })
       
   
}

              modifay=(e)=>{
                  var n=e.currentTarget.id
                  var t;
                  var tb=[];
          for(var i = 0; i < this.state.tab.length; i++){
           if(this.state.tab[i].num == n){
           t=this.state.tab[i]
          }
          if(this.state.tab[i].num != n){
            tb.push(this.state.tab[i])
         }}
          document.getElementById(e.currentTarget.id+"e").remove()
    
   

              
         this.setState({
          ref:t.ref,
          tab:tb,
          Remise:t.Remise,
          Qte:t.Qte,
         })
           
              console.log(t)
                };

                onTodoChanger=(e)=>{
                  var value=e
                  this.setState({
                    Remise:value,
                  });
              }
              onTodoChangeq=(e)=>{
                var value=e
                this.setState({
                  Qte:value,
                });
            }
            onTodoChangeref=(e)=>{
              var value=e.currentTarget.value
              this.setState({
                ref: value.toUpperCase(),
              });
          }
          onTodoChangeprix=(e)=>{
            var value=e
            this.setState({
              Prix: value,
            });
        }
        onTodoChangetva=(e)=>{
          var value=e
          this.setState({
            Tva: value,
          });
      }
          

       onChangev=(value)=> {
        this.setState({
          voiture_id:this.state.voiture[value].id,
          client:this.state.voiture[value].client_id,
          client_cin:this.state.voiture[value].cin,
          model:this.state.voiture[value].model,
        })
      }

 render(){
 
  
  
  return (
<div style={{textAlign:"center"}}>{this.state.loading?<LoadingPage/> :<></>}
    {!this.state.voiture.length  ?  <LoadingPage/>  : 
         <div className="factdiv">
         <Select
             showSearch
             style={{ width:"100%" }}
             placeholder="Select"
             optionFilterProp="children"
             onChange={this.onChangev}
             filterOption={(input, option) =>
             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
   {
                  this.state.voiture.map(function(item, i){
                    return <Option value={i}>{item.num_immatriculation}</Option>
                     })}
  </Select>
         <div className="modelclient">
             <p>Modele : {this.state.model} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; CIN du client : {this.state.client_cin}</p>
         </div>
         <Table responsive>
      <thead>
        <tr>
          <th>Ref</th>
          <th>Designation</th>
          <th>Prix</th>
          <th>Remise</th>
          <th>Qte</th>
          <th>TVA</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          
       {this.state.afficherep}
        <tr>
         
          <td>{ <input  id="ref"  onChange={this.onTodoChangeref} value={this.state.ref}  />}</td>
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
                  this.state.data.map(function(item, i){
                    return <Option value={i}>{item.designation}</Option>
                     })}
              
              
              </Select>}</td>
          <td>{<InputNumber min={0}  type={Number} id="prix" defaultValue={0} onChange={this.onTodoChangeprix} value={this.state.Prix}  />}</td>
          <td>{<InputNumber min={0} max={100} id="remise" defaultValue={0} onChange={this.onTodoChanger} value={this.state.Remise}  />}</td>
          <td>{<InputNumber min={1} max={100} id="qte" defaultValue={1} onChange={this.onTodoChangeq} value={this.state.Qte}  />}</td>
          <td>{<InputNumber min={0}  id="tva" defaultValue={0} onChange={this.onTodoChangetva} value={this.state.Tva}  />}</td>
          <td><button onClick={this.add} >Ajouter</button></td>
        </tr>
      </tbody>
    </Table>
          <Button type="submit" onClick={this.affichetab}>Envoyer</Button>
          <p>{}</p>
          </div>}</div>
  );
}
 }
 


export default Factdiv;