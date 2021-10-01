import React, { useEffect } from 'react';
import { List } from 'antd';
import {
    SnippetsOutlined,
    FormOutlined,
    ZoomInOutlined,
    ToolOutlined,
    PartitionOutlined,
    UserOutlined
  } from '@ant-design/icons';
  import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
  } from 'reactstrap';
  import {  useHistory, useLocation } from "react-router-dom";
  import { Link } from "react-router-dom";
  
function Menu1 (){
  const emp=JSON.parse(localStorage.getItem("emp"))
  let location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/employe/loginem" } };
useEffect(() => {
  const emp=JSON.parse(localStorage.getItem("emp"))
  if (!emp) {
    history.push(from);
  }
  return () => {
   
  }
}, [])
const data=[{link:"/employe/reservation",
             titre:"Reservation",
              icone:<SnippetsOutlined />,
              role:2
           },{
            link:"/employe/OR",
            titre:"OR",
             icone:<FormOutlined />,
             role:2
           },{
            link:"/employe/listeor",
            titre:"Gestion de tache",
             icone:<PartitionOutlined />,
             role:3
            },{
              link:"/employe/listeor",
              titre:"liste des OR",
               icone:<PartitionOutlined />,
               role:2
              },{
                link:"/employe/listev",
                titre:"liste des voiture",
                 icone:<PartitionOutlined />,
                 role:2
                },{
              link:"/employe/listetach",
              titre:"Reparer voiture",
              icone:<ToolOutlined />,
              role:1
                 },{
                  link:"/employe/tacheserror",
                  titre:"Tache en error",
                  icone:<ToolOutlined />,
                  role:3
                     },{
             link:'/employe/controltache',
             titre:"Controle de tache",
              icone:<ZoomInOutlined />,
              role:3
                    },{
                      link:"/employe/listetachemp",
                      titre:"Mon activité",
                      icone:<ToolOutlined />,
                      role:1
                         }]



return(<>
  { emp ?<>
 <UncontrolledDropdown className="accounticone" >
            <DropdownToggle nav caret>
              <UserOutlined />

              </DropdownToggle>

              <DropdownMenu right>

              <DropdownItem ><Link to="/employe">Home</Link>
                </DropdownItem>
                
                <DropdownItem divider />
                <DropdownItem href="/employe/loginem">  
                  Déconnexion
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>

    <div style={{textAlign:"center"}} >
    
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    dataSource={data.filter(item=>item.role == emp.role)}
    renderItem={(item,i) => (
      <List.Item className="Liste" id={i}>
       <Link to={item.link}>
    <div className="reservation">
    <div className="card">
          <div className="card-body">
            <h2>{item.icone}</h2>
            <ul>
         <li>&nbsp;{item.titre}</li>
             </ul>     
          </div>
        </div>
     
    </div> </Link>
      </List.Item>
    )}
  /></div></>
  :<></>}</>
);}
export default Menu1; 