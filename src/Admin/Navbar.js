import {useState} from 'react';
import { Layout, Menu,Image } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  CarOutlined,
  SettingOutlined,
  LoginOutlined,
  MessageOutlined
} from '@ant-design/icons';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
} from 'reactstrap';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Ajoutproduit from'../stock/ajoutproduit';
import Liste from'../stock/listeproduit';
import MRegister from'../stock/modifyprod';
import Calendar from'../calendar/calendar';
import { Link } from "react-router-dom";
import Listepub from'../pub/listepub';
import Addpub from'../pub/addpub';
import Factdiv from'../factdiv/factdiv';
import Orvalid from'../factdiv/listeorvalid';
import Listecontact from'../contact/listecontact';
import Listereservation from'../reserve/listereservation';
import Registerclient from'../client/addclient';
import Listeclient from'../client/listeclient';
import Addservice from'../service/addservice';
import Listeservice from'../service/listeservice';
import MODsociete from'../societe/modifservice';
import Addsociete from'../societe/Addsociete';
import Listefacture from'../factdiv/listefact';
import MFactdiv from'../factdiv/modiffact';
import Factor from'../factdiv/factor';
import Modifclient from'../client/modifclient';
import Modifierpub from'../pub/modifpub';
import Modifservice from'../service/modifservice';
import Listecomptevalide from'../comptevalide/comptevalide';
import Listecompte from'../comptevalide/listecompte';
import glisscompte from'../comptevalide/glissercompte';
import Chat from'../chat/Chat';
import Inbox from'../chat/Inbox';

import './Navbar.scss';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const  Navbar =()=> {
  
  const [collapsed,setcollapsed] = useState(false);
  const [width,setwidth] = useState("200px");
 const  onCollapse = collapsed => {
  if(width==="200px"){
    setwidth("");
  }else{
    setwidth("200px");
  }
    setcollapsed( collapsed );
    
    
  };
  
  const widthw=window.innerWidth;
  
  let location = useLocation();
  

  
    
    return (
      <div className="navbara">
      <Layout style={{ minHeight: '100vh' }} >
        <Sider  collapsible className="l1"  collapsed={widthw < 1350 ?  true :collapsed} onCollapse={widthw < 1350 ?  null :onCollapse} >
          
          <Menu  defaultSelectedKeys={[location.pathname]} className="navbarscroll" id="navbarscroll"  mode="inline"  style={{position: "",width: widthw < 1350 ?  "" :width }}>
          <Menu.Item key="1" style={{height:"150px"}}  >
        <Image
        src="data:image/png;base64,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"
         /> 
           </Menu.Item>
            <Menu.Item key="/admin/" icon={<PieChartOutlined />} >
            <Link to="/admin/">Calendrier</Link>
            </Menu.Item>
            <Menu.Item key="/admin/Listepub" icon={<DesktopOutlined />} >
            <Link to="/admin/Listepub">Liste des publications</Link>
            </Menu.Item>
            <SubMenu key="sub4" icon={<SettingOutlined  />} title="service" className="service">
              <Menu.Item key="/admin/Addservice"  ><Link to="/admin/Addservice">Ajouter</Link></Menu.Item>
              <Menu.Item key="/admin/Listeservice" ><Link to="/admin/Listeservice">liste des services</Link></Menu.Item>
             
            </SubMenu>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Produit" className="produit">
              <Menu.Item key="/admin/Ajoute" ><Link to="/admin/Ajoute">Ajouter</Link></Menu.Item>
              <Menu.Item key="/admin/Listeproduit"><Link to="/admin/Listeproduit">Liste des produits</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Liste">
              <Menu.Item key="/admin/listeContact" ><Link to="/admin/listeContact">Liste des contacts</Link></Menu.Item>
              <Menu.Item key="/admin/listereservation" ><Link to="/admin/listereservation">Liste des reservations</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="Client">
              <Menu.Item key="/admin/addclient" ><Link to="/admin/addclient">Ajouter un client</Link></Menu.Item>
              <Menu.Item key="/admin/listeclient"><Link to="/admin/listeclient">Liste des clients</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="/admin/factdiv" icon={<FileOutlined />} >
              <Link to="/admin/factdiv">Fichier</Link>
            </Menu.Item>
            <Menu.Item key="/admin/Listefacture" icon={<FileOutlined />} >
              <Link to="/admin/Listefacture">Liste des Factures</Link>
            </Menu.Item>
            <Menu.Item key="/admin/Orvalid" icon={<FileOutlined />} >
              <Link to="/admin/Orvalid">OR validé</Link>
            </Menu.Item>
            <SubMenu key="sub5" icon={<LoginOutlined />} title="Gestion de compte">
              <Menu.Item key="/admin/Listecompte" ><Link to="/admin/Listecompte">Accepter un compte</Link></Menu.Item>
              <Menu.Item key="/admin/Listecomptevalide"><Link to="/admin/Listecomptevalide">Listes des comptes</Link></Menu.Item>
              <Menu.Item key="/admin/glisscompte"><Link to="/admin/glisscompte">Changer le type de compte</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<LoginOutlined />} title="Gestion de societe">
              <Menu.Item key="/admin/Addsociete" ><Link to="/admin/Addsociete">Ajouter une societe</Link></Menu.Item>
              <Menu.Item key="/admin/modiffsociete"><Link to="/admin/modiffsociete">Modifier une Societe</Link></Menu.Item>
              
            </SubMenu>
            
            
            <Menu.Item key="/admin/chatinbox" icon={<MessageOutlined />}><Link to="/admin/chatinbox">Messages</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="l1 site-layout-background" style={{ padding: 0 }} >
          <UncontrolledDropdown className="accounticone" >
            <DropdownToggle nav caret>
              <UserOutlined />
              </DropdownToggle>
              <DropdownMenu right>
              
              <DropdownItem ><Link to="/">
                  Accueil</Link>
                </DropdownItem>
                
                
                <DropdownItem ><Link to="/Account"> 
                 Compte</Link>
                </DropdownItem>
                
                
                <DropdownItem >
                <Link to="/Register">
                <CarOutlined style={{fontSize: "20px"}} /> s'inscrire </Link>
                </DropdownItem>
               
                <DropdownItem divider />
              
                <DropdownItem href="/login">  
                  Déconnexion
                
                </DropdownItem>
              
              </DropdownMenu>

            </UncontrolledDropdown>
          </Header>
          <Content  style={{  }}>
      <CSSTransition
        key={location.key || false}
        timeout={800}
        classNames="fadeScale">
        <Routes location={location}>
            <Route exact  path="/admin/Ajoute" component={Ajoutproduit} />
            <Route exact  path="/admin/Listeproduit" component={Liste} />
            <Route  path="/admin/Modifier/:id" component={MRegister} />
            <Route exact path="/admin/Listepub" component={Listepub} />
            <Route exact path="/admin/addpub" component={Addpub} />
            <Route  path="/admin/Modifierpub/:id" component={Modifierpub} />
            <Route exact path="/admin/" component={Calendar} />
            <Route exact path="/admin/factdiv" component={Factdiv} />
            <Route exact path="/admin/Orvalid" component={Orvalid} />
            <Route exact path="/admin/listeContact" component={Listecontact} />
            <Route exact path="/admin/listereservation" component={Listereservation} />
            <Route exact path="/admin/addclient" component={Registerclient} />
            <Route exact path="/admin/listeclient" component={Listeclient} />
            <Route exact path="/admin/Addservice" component={Addservice} />
            <Route exact path="/admin/Modifservice/:id" component={Modifservice} />
            <Route exact path="/admin/Listeservice" component={Listeservice} />
            <Route exact path="/admin/Listefacture" component={Listefacture} />
            <Route exact path="/admin/Modiffact/:id" component={MFactdiv} />
            <Route exact path="/admin/factor/:id" component={Factor} />
            <Route exact path="/admin/modifclient/:id" component={Modifclient} />
            <Route exact path="/admin/Listecomptevalide" component={Listecomptevalide} />
            <Route exact path="/admin/Listecompte" component={Listecompte} />
            <Route exact path="/admin/glisscompte" component={glisscompte} />
            <Route exact path="/admin/Addsociete" component={Addsociete} />
            <Route exact path="/admin/modiffsociete" component={MODsociete} />
            <Route exact path="/admin/chatinbox"component={Inbox}/>
            <Route exact path="/admin/messages/:id" component={Chat}/>
         
            {//<Navigate to="/404" />
            }
            </Routes>
            </CSSTransition>
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
            </Layout>
  
      </div>
      
    );
  
}

export default Navbar;