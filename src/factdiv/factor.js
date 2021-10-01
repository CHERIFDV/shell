
import React,{Component}from'react';
import { Button} from 'react-bootstrap';
import { Table } from 'reactstrap';
import LoadingPage from "../loading/LoadingPage";
import { SettingOutlined } from '@ant-design/icons';
import { Select ,InputNumber,notification,Spin,Modal } from 'antd';

import {MinusCircleOutlined,EditOutlined } from '@ant-design/icons';
import './factdiv.scss';
import axios from'axios';
const { Option } = Select;

const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type,
      description:
        'This is the content of the notification.',
    });
  };





 class Factor extends Component{

 constructor (props) {

  super(props);
  
  
  this.state = {
    tab: [],
    ref:"",
    nomDesignation:"select",
    iddesignation : "",
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
    voiture_id:"",
    dtid:null,
    isModalVisible:false,
    index:0,
    tache:[],
    valid:true,

  }
};


   showModal = () => {

       if (this.state.tache.length>this.state.index) {
      this.setState({
        Tva:this.state.tache[this.state.index].tva,
        Prix:this.state.tache[this.state.index].Prix,
        Remise:0,
        Qte:this.state.tache[this.state.index].qte,
        nomDesignation:this.state.tache[this.state.index].designation,
        isModalVisible:true
      })
      if(this.state.valid){
        this.setState({
            index:this.state.index+1
          })
      }}
  };

   handleOk = () => {
       this.add()
    this.setState({
        isModalVisible:false,
      })
      this.showModal()
  };

   handleCancel = () => {
   /*/ this.setState({
        isModalVisible:false
      })/*/
  };

componentDidMount() {



    axios.get('/api/reparation/get_rep',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
    this.setState({
      data:res.data
    }) 
  })

   axios.get('/api/admin/get_or_by_id/'+this.props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res=> {
      var data=res.data;
      
      this.setState({
        client_id:data[0][0].client_id,
        client:data[0][0].nom+" "+data[0][0].prenom,
        cin:data[0][0].cin,
        model:data[0][0].model,
        matricule:data[0][0].num_immatriculation,
        tache: data[1],
        voiture_id:data[0][0].voiture_id,
      })
      this.showModal()
      })









}




   onChanger=(value)=> {
    
     this.setState({
      ref:value
    })
   





    
  }
    onChanged=(value)=> {
     
     this.setState({
      nomDesignation:this.state.data[value].designation,
      iddesignation:this.state.data[value].id,
      Tva:this.state.data[value].tva,
      Prix:this.state.data[value].price,
    })
   
  }
    onBlur=(e)=> {
     
      document.getElementById("Designation").value =this.state.nomDesignation;
    
  }
    onFocus=()=> {
    
  }
    onSearch=(val)=> {
      
      if(val!=""){
      this.setState({
        nomDesignation:val,
        iddesignation:null
      })}
  }

   ta;
   b;
    deletelement=(e,id)=>{
      console.log(id)
     if(id!=null){
      axios.delete('/api/detail/delete_detail/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
       console.log(response)
     })
     .catch(error => {
         console.log(error.response)
     });     
    }


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
      axios.post('/api/fact/add_fact',{fact_num:3,client_id:this.state.client_id,voiture_id:this.state.voiture_id,societe_id:1,details:this.state.tab},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        this.setState({
          loading:false,
          
        })
     })
     .catch(error => {
         console.log(error.response)
     });  }
     
    }
   add=()=>{
  var remise=document.getElementById("remise").value;
  var qte=document.getElementById("qte").value
  var tva=document.getElementById("tva").value
  var prix=document.getElementById("prix").value
         if (this.state.ref==="") {
         openNotificationWithIcon('error')
         this.setState({
            valid:false
          })
        }else{
        if (this.state.nomDesignation===""||this.state.nomDesignation==="select") {
         openNotificationWithIcon('error')
         this.setState({
            valid:false
          })
        }else{
          if (remise<0||remise>100||remise==="") {
            openNotificationWithIcon('error')
            this.setState({
                valid:false
              })
           }else{
            if (qte<=0||qte>100||qte==="") {
              openNotificationWithIcon('error')
              this.setState({
                valid:false
              })
             }else{
              if (tva<0||tva>100||tva==="") {
                openNotificationWithIcon('error')
                this.setState({
                    valid:false
                  })
               }else{
         

         if (prix<=0||prix==="") {
          openNotificationWithIcon('error')
          this.setState({
            valid:false
          })
         }else{
          
         this.ta={
         dtid:this.state.dtid,
         num:this.state.nb,
         designation:this.state.nomDesignation,
         ref:this.state.ref,
         iddesignation:this.state.iddesignation,
         remise:this.state.Remise,
         Qte:this.state.Qte,
         tva:this.state.Tva,
         Prix:this.state.Prix,
         type:1,
         };
    this.setState({
      tab:[...this.state.tab,this.ta],
      nomDesignation:"Select",
      ref:"",
      Remise:0,
      Qte:1,
      Tva:0,
      Prix:0,
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
            openNotificationWithIcon('success')
        }}}}}}
        this.setState({
          nb:this.state.nb+1
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
          console.log(t)
         this.setState({
          dtid:t.dtid,
          ref:t.ref,
          tab:tb,
          Tva:t.tva,
          Prix:t.Prix,
          Remise:t.remise,
          Qte:t.Qte,
          nomDesignation:t.designation,
          iddesignation:t.iddesignation,
         })
           
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
          voiture_id:this.state.voiture[value].client_id,
          client:this.state.voiture[value].client_id,
          model:this.state.voiture[value].model,
        })
      }

 render(){
  const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
  
  
  return (
<div style={{textAlign:"center"}}>
{this.state.loading?<LoadingPage/> :<></>}
    <>
      <Modal title="Basic Modal" width={1000} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
      <Table responsive>
      <thead>
        <tr>
          <th>Ref</th>
          <th>Designation</th>
          <th>Prix</th>
          <th>Remise</th>
          <th>Qte</th>
          <th>TVA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ <input type="text"  id="ref"  onChange={this.onTodoChangeref} value={this.state.ref}  />}</td>
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
          <td>{<InputNumber min={0}   id="prix" onChange={this.onTodoChangeprix} value={this.state.Prix}  />}</td>
          <td>{<InputNumber min={0} max={100} id="remise"  onChange={this.onTodoChanger} value={this.state.Remise}  />}</td>
          <td>{<InputNumber min={1} max={100} id="qte"  onChange={this.onTodoChangeq} value={this.state.Qte}  />}</td>
          <td>{<InputNumber min={0}  id="tva"  onChange={this.onTodoChangetva} value={this.state.Tva}  />}</td>
        </tr>
      </tbody>
    </Table>
      </Modal>
    </>
    {!this.state.client  ?  <Spin indicator={antIcon} /> : 
         <div className="factdiv">
         <div className="modelclient">
         <p>Matricule : {this.state.matricule} </p>
             <p>Model : {this.state.model} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; client : {this.state.client}</p>
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
         
          <td>{ <input type="text"  id="ref"  onChange={this.onTodoChangeref} value={this.state.ref}  />}</td>
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
          <td>{<InputNumber min={0}   id="prix" defaultValue={0} onChange={this.onTodoChangeprix} value={this.state.Prix}  />}</td>
          <td>{<InputNumber min={0} max={100} id="remise" defaultValue={0} onChange={this.onTodoChanger} value={this.state.Remise}  />}</td>
          <td>{<InputNumber min={1} max={100} id="qte" defaultValue={1} onChange={this.onTodoChangeq} value={this.state.Qte}  />}</td>
          <td>{<InputNumber min={0}  id="tva" defaultValue={0} onChange={this.onTodoChangetva} value={this.state.Tva}  />}</td>
          <td><button onClick={this.add} >Add</button></td>
        </tr>
      </tbody>
    </Table>
          <Button type="submit" onClick={this.affichetab}>Envoyer</Button>
          <p>{}</p>
          </div>}</div>
  );
}
 }
 


export default Factor;