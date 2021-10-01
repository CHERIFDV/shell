import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import { Component } from 'react';
import { List,notification,Select} from 'antd';
import axios from'axios';
import './glisscompte.scss';
// Customize Table Transfer
import LoadingPage from "../loading/LoadingPage";
import { Modal  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;


const leftTableColumns = [
  {
    dataIndex: 'Email',
    title: 'Email',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'Email',
    title: 'Email',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];

class glisscompte extends Component {
  
  state = {
    targetKeys: [],
    disabled: false,
    showSearch: true,
    mockData : [],
    oneselect:null,
    emp:[],
    loading:false,
    
  };

  

  componentDidMount() {
     axios.get('/api/admin/users',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
    let b=[]
    let role=[]
    res.data.map(function(item, i){
      if(item.role_as==="admin"){
        role.push(item.id+"")
      }
     b.push({
      key: item.id.toString(),
      Email:item.email,
      description: "Cin : "+item.cin+" Nom : "+item.nom+" Prenom : "+item.prenom  ,
      disabled: 0 ,
      tag: item.role_as,
    }); })
    this.setState({
      mockData:b,
      targetKeys:role,
    }

    )
  })

  axios.get('/api/admin/get_personnel',{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
    
    this.setState({
      emp:res.data,
    }

    )
  })
  
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {

    }
  
  
  }














 
  onChange = nextTargetKeys => {
    
    var logout=false
    const V=(nextTargetKeys,logout)=>{
      const idtab=localStorage.getItem("idmouve").split(",")
      let tab=this.state.mockData
      for (let index = 0; index < idtab.length; index++) {
  
       var  id=idtab[index];
 
      axios.put('/api/admin/update_role/'+id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
         .then(response => { 
          notification[response.data.type]({
            message: response.data.type,
            description:
            response.data.message,
          });
       if(JSON.parse(localStorage.getItem("user")).id==id){
        logout=true
      }
          if(response.data.status){
            if(logout==true){
              localStorage.removeItem("user")
              window.location.reload(true);
            }
          const n= tab.findIndex((function(c) { 
            return c.key == id; 
           }))
  
       tab[n]={
        key:  tab[n].key.toString(),
        Email: tab[n].Email,
        description:  tab[n].description,
        disabled: 0 ,
        tag: tab[n].tag==="admin"? "user":"admin",
      }
          this.setState({ 
            targetKeys: nextTargetKeys,
            mockData:tab,
          });

        }

        })
        .catch(error => {
            console.log(error.messages)
            console.log("error")
        });     
       
      }
      localStorage.removeItem("idmouve")
    }
    confirm({
      title: 'Vous etes sur ?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        V(nextTargetKeys,logout)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

   changeemp=(e,id)=>{
    console.log(parseInt(e))
 var that=this
  confirm({
    title: 'Vous etes sur ?',
    icon: <ExclamationCircleOutlined />,
    content: '',
    onOk() {
      that.setState({
        loading:true,
        
      })
      axios.put('/api/admin/update_role_personnel/'+id,{role:parseInt(e)},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        that.setState({
          loading:false,
          
        })
        notification[response.data.type]({
          message: response.data.type,
          description:
          response.data.message,
        });
     })
     .catch(error => {
         console.log(error)
     });     
        

    },
    onCancel() {
      console.log('Cancel');
    },
  });



}
   
  

/*/
/*/
  

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

   TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
     
    <Transfer {...restProps} showSelectAll={true}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
       
        const rowSelection = {
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            
            
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
              localStorage.setItem("idmouve",treeSelectedKeys);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
            localStorage.setItem("idmouve",key);

          },
          selectedRowKeys: listSelectedKeys,
          
          
        };
      
        return (
          
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
  
  render() {
    const { targetKeys, disabled, showSearch } = this.state;
    return (
    
      <div>{this.state.loading?<LoadingPage/> :<></>}
      {!this.state.mockData.length ?  <LoadingPage/>  :  <div>




      <div className='glisscompte'>
        <this.TableTransfer
          dataSource={this.state.mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.Email.indexOf(inputValue) !== -1 || item.description.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={this.triggerDisable}
          style={{ marginTop: 16 }}
        />
         <hr
        style={{
            color: "black",
            backgroundColor: "black",
            height: 5
        }}
    />
       <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
      xxl: 1,
    }}
    dataSource={this.state.emp/*/.filter(item=>item.props.titre.indexOf(search) !== -1)/*/}
    renderItem={(item,i) => (
      <List.Item >
        <div>
        NOM :{item.nom+" "+item.nom}
        
        <Select
             
               onChange={e=>{this.changeemp(e,item.id)}}
              defaultValue={item.role==1 ? "Mecanicien":item.role==2 ? "Agent de Reception" : item.role==3 ?"Chef Atelier":"Sans Poste"}
                  style={{ display: 'block' }}
                 >
                 <option value="1" label="Mecanicien" >Mecanicien</option>
                 <option value="2" label="Agent de Reception" >Agent de Reception</option>
                 <option value="3" label="Chef Atelier" >Chef Atelier</option>
                 <option value="0" label="Sans Poste" >Sans Poste</option>
                 </Select></div>
      
      </List.Item>
    
    )}
  />
      </div></div>}</div>
    );
  }
}


export default glisscompte;