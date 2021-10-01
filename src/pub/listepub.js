import React, { useState,useEffect } from 'react';
import { List,Input} from 'antd';
import {VerticalAlignTopOutlined} from '@ant-design/icons';
import axios from'axios';
import Pub from './pub';
import { Link } from "react-router-dom";
import './listepub.scss';
import LoadingPage from "../loading/LoadingPage";

function Listepub (){
  const [data,setdata]=useState("");
  const [index,setindex]=useState(10);
  const [l,setl]=useState(<a onClick={()=>{setindex(index+10 )} }>affiche plus</a>);
  const [search,setsearch]=useState("");
  const onsearch=e=>{
    setsearch(e.target.value)
   }
  useEffect(()=>{
    setl(<LoadingPage/>)
    const user=JSON.parse(localStorage.getItem("user"))
     var url="/api/pub/get_pub_by_user_ids/"+user.id+"/"+search
if (search==="") {
  url="/api/pub/get_pub_by_user_id/"+user.id+"/"+index
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
          setdata(pubs)
            setl(<a onClick={()=>{setindex(index+10)} }>affiche plus</a>)    
  })
    return ()=>{   
    }
  },[index,search])
  
 
return(
  <div style={{textAlign:"center"}}>
  {!data  ? <LoadingPage/>  :
  <>
   <div className="addpub">
<Link to="/admin/addpub"> <VerticalAlignTopOutlined  className="plus"  /></Link>
<input  type="text" name="search" placeholder="recherche" onChange={onsearch} value={search}/>
</div>
  <div className="listepub">
    
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 2,
      xxl: 2,
    }}
    dataSource={data.filter(item=>item.props.titre.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
    renderItem={(item,i) => (
      <List.Item className="listepub1">
                 {item}        
      </List.Item>
    
    )}
  />
    </div></>}
    {data.length>=10?<div>{l}</div>:<></>}</div>
);}
export default Listepub; 