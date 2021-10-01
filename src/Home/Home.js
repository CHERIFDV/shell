
import {Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { SettingOutlined } from '@ant-design/icons';
import {Spin, notification,Image } from 'antd';
import Pub from '../pub/pub';
import LoadingPage from "../loading/LoadingPage";
import './Home.scss';
import axios from'axios';

  const items = [
    {
      src: '/images/160459-158633209_463933328137273_329841242870728832_n.jpg',
      
      key: '1'
    },
    {
      src: '/images/160602-159099552_469824637704253_6257664460554987196_n.jpg',
      
      key: '2'
    },
    {
      src: '/images/161044-119010043_599547830712967_8202192655674585972_n.jpg',
     
      key: '3'
    },{
      src: '/images/161414-123137551_954114398331667_7189513519865606607_n.jpg',
     
      key: '4'
    }
    
  ];
class Home extends Component {
  constructor (props) {

    super(props);
    
    
    this.state = {
      loading:true,
      data:'',
      index:10,
      l:<a onClick={()=>{this.setState({index:this.state.index+10 })} }>affiche plus</a>,
    }
    
    
    
    
    
  };
  
  componentDidMount() {
    const user=JSON.parse(localStorage.getItem("user"))
     if(!user){
      notification.open({
        message: 'JED AUTO',
        description:
        <Image width={'100%'} src="/images/160459-158633209_463933328137273_329841242870728832_n.jpg"    />,
        top:100,
        duration: 5
      });
    }
    var url
             if (user) {
              url="api/pub/get_pub_by_user_id/"+user.id+"/"+this.state.index
             }else{
              url="api/pub/get_pub"
             }
          axios.get(url,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
            let pubs=[]
          
            res.data[0].map(function(item, i){
              let likedpub=false;
              res.data[1].filter(pubid=>pubid.pub_id == item.id).map(function(pid, i){
                likedpub=true;
             })
                  pubs.push( <Pub titre={item.titre} i={i} liked={likedpub} id={item.id}  description={item.description} like={item.nb_likes} photo1={item.photo1} photo2={item.photo2} nbcomment={item.nb_comments}/>)
             })
          this.setState({
            data:pubs,
            loading:false,

          }) 
        })
         
        }  
        componentDidUpdate(prevProps, prevState) {
          if (prevState.index !== this.state.index) {
            
            this.setState({
              l:<LoadingPage/>,
            }) 
          const user=JSON.parse(localStorage.getItem("user"))
           var url
             if (user) {
              url="api/pub/get_pub_by_user_id/"+user.id+"/"+this.state.index
             }else{
              url="api/pub/get_pub"
             }
          axios.get(url,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {
            let pubs=[]
          
            res.data[0].map(function(item, i){
              let likedpub=false;
              res.data[1].filter(pubid=>pubid.pub_id == item.id).map(function(pid, i){
                likedpub=true;
             })
                  pubs.push( <Pub titre={item.titre} i={i} liked={likedpub} id={item.id}  description={item.description} like={item.nb_likes} photo1={item.photo1} photo2={item.photo2} nbcomment={item.nb_comments}/>)
             })
          this.setState({
            data:pubs,
            loading:false,
            l:<a onClick={()=>{this.setState({index:this.state.index+10 })} }>affiche plus</a>,
          }) 
        })
      }
        }
      
  render() {
    const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;
    return (
        <div className='Home' style={{textAlign:"center"}}>
          <div style={{display:"flex"}}>
<UncontrolledCarousel items={items}  style={{ width:'70%',height:"500px"}}/>
{/*/<UncontrolledCarousel items={items}  style={{ width:'50%',height:"200px"}}/>/*/}
</div>
<div style={{textAlign:"center"}}>
    {!this.state.data  ?  <Spin indicator={antIcon} /> : 
  <div className="listepub" style={{textAlign:"left"}}>
    {this.state.data}
    </div>

    }</div>

{this.state.data.length>=10?<div>{this.state.l}</div>:<></>}


      

      </div>
    );
  }
}

export default Home;