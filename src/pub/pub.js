import React,{ useEffect,useState } from 'react';
import axios from'axios';
import { Card, Avatar,Image,Tooltip, Form, Button, List, Input,Modal } from 'antd';
import { Comment } from'@ant-design/compatible';
import { EditOutlined,SendOutlined, LikeOutlined,DeleteOutlined, DislikeFilled, LikeFilled,DislikeOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import './pub.scss';
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
const { Meta } = Card;
const { confirm } = Modal;







function Pub(props){
  const [nom, setnom] = useState(null);
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
       
        <Input rows={4} autoFocus placeholder={!nom?"Votre Commenter":nom} className="input" onChange={onChange} value={value} />
        {window.innerWidth>=570?
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Ajouter Commentaire
        </Button>
        : <SendOutlined  htmlType="submit" loading={submitting} onClick={onSubmit} />}
      </Form.Item>
    </>
  );
  const [submitting, setsubmitting] = useState(false)
  const [value, setvalue] = useState('')
  
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  const [replay, setreaplay] = useState(null);
  
  const [refresh, setrefrech] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
    
      let { from } = location.state || { from: { pathname: "/login" } };
const like = (id) => { 

if (user==null) {
  navigate(from) 
}



if(document.getElementById("spanl1"+id).childNodes[1].style.display==='none'){
  axios.post('/api/commentaire/like_comment/'+user.id +'/'+id,{id:id},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
     console.log(response)})
  document.getElementById("spanl1"+id).childNodes[0].style="display:none";
  document.getElementById("spanl1"+id).childNodes[1].style="display:";
  document.getElementById("spand1"+id).childNodes[1].style="display:none";
  document.getElementById("spand1"+id).childNodes[0].style="display:";
  document.getElementById("spanl2"+id).innerHTML=parseInt(document.getElementById("spanl2"+id).innerHTML)+1
  if(parseInt(document.getElementById("spand2"+id).innerHTML)>=1){
  document.getElementById("spand2"+id).innerHTML=parseInt(document.getElementById("spand2"+id).innerHTML)-1}
}
};

const dislike = (id) => {
  if (user==null) {
    navigate(from) 
  }
  if(document.getElementById("spand1"+id).childNodes[1].style.display==='none'){
  axios.post('/api/commentaire/dislike_comment/'+user.id +'/'+id,{id:id},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  .then(response => { 
   console.log(response)})
  document.getElementById("spanl1"+id).childNodes[1].style="display:none";
  document.getElementById("spanl1"+id).childNodes[0].style="display:";
  document.getElementById("spand1"+id).childNodes[0].style="display:none";
  document.getElementById("spand1"+id).childNodes[1].style="display:";
  document.getElementById("spand2"+id).innerHTML=parseInt(document.getElementById("spand2"+id).innerHTML)+1
  if(parseInt(document.getElementById("spanl2"+id).innerHTML)>=1){
  document.getElementById("spanl2"+id).innerHTML=parseInt(document.getElementById("spanl2"+id).innerHTML)-1}}
};
const [comments, setcomment] = useState([]);
const [afcoments, setafcoments] = useState(false);
useEffect(() => {
  if (afcoments) {
  const user=JSON.parse(localStorage.getItem("user"))
  var url
           if (user) {
            url="/api/pub/get_com_By_PUB_Id/"+props.id+"/"+user.id
          
        axios.get(url,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }}).then(res => {     
  let com=[]
  var liked;
  res.data[0].map(function(item, i){
    liked=null;
    res.data[2].filter(lcom=>lcom.comment_id == item.id).map(function(coment, i){
      liked='liked';
   })
   res.data[3].filter(dlcom=>dlcom.comment_id == item.id).map(function(coment, i){
     liked='disliked';
   })
   
    com.push(
  <Comment id={'commentparent'+item.id}
              actions={[<Tooltip key="comment-basic-like" title="Like">
              <span  onClick={()=>{like(item.id)}}>
              {liked==='liked'||!liked==='disliked' ? <span  id={"spanl1"+item.id}    ><LikeOutlined style={{display:"none"}}/><LikeFilled /></span>: <span  id={"spanl1"+item.id}    ><LikeOutlined /><LikeFilled style={{display:"none"}}/></span>}
                    <span className="comment-action" id={"spanl2"+item.id}>{item.like}</span>
              </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
              <span onClick={()=>{dislike(item.id)}}>
              {liked ==='disliked'||!liked==='liked' ? 
              <span  id={"spand1"+item.id}>< DislikeOutlined style={{display:"none"}} />< DislikeFilled /></span>
               :
               <span  id={"spand1"+item.id}>< DislikeOutlined/>< DislikeFilled style={{display:"none"}}/></span>
               }
                <span className="comment-action" id={"spand2"+item.id}>{item.dislike}</span>
              </span>
            </Tooltip>,
            <span key="comment-basic-reply-to" onClick={()=>{setreaplay(item.id);setnom("#"+item.nom+" "+item.prenom)}}>répondre</span>,
             item.user_id==user.id||user.role_as==="admin"?<span key="delet_comment" onClick={()=>{deletcom(item.id)}}>effacer commentaire</span>:<></>
          
          ]}
              author={<a>{item.nom+" "+item.prenom}</a>}
              avatar={
                <Avatar
                  src={item.photo}
                  alt={item.nom+" "+item.prenom}
                />
              }
              content={
                <p>
               { item.description}
                </p>
              }
              datetime={
                <Tooltip title={format(new Date(item.created_at), 'yyyy/MM/dd ')}>
                  <span>{format(new Date(item.created_at), 'yyyy/MM/dd ')}</span>
                </Tooltip>
              }
            >{
              res.data[1].filter(rep=>rep.comment_id == item.id).map(function(repitem, i){
              return(        
           <Comment
           actions={[
            repitem.user_id==user.id||user.role_as==="admin"?<span key="delet_comment" onClick={()=>{deletrep(repitem.id)}}>effacer commentaire</span>:<></>
           ]}
              author={<a>{repitem.nom+" "+repitem.prenom}</a>}
              avatar={
                <Avatar
                  src={repitem.photo}
                  alt={repitem.nom+" "+repitem.prenom}
                />
              }
              content={
                <p>
               { repitem.description}
                </p>
              }
              datetime={
                <Tooltip title={format(new Date(repitem.created_at), 'yyyy/MM/dd ')}>
                  <span>{format(new Date(repitem.created_at), 'yyyy/MM/dd ')}</span>
                </Tooltip>
              }
            >
  
              
            </Comment> )})}
  
            </Comment>)})
  
 
  setcomment(com);
  if(com.length>0){
  document.getElementById("comment"+props.id).style="display:";
  }
  document.getElementById("aff"+props.id).innerHTML="Mask commentaire"
  }) 
  }else{         
  navigate(from) 
  }}
  return () => { 
  }
}, [afcoments,refresh])

  const handleSubmit = () => {
    
    if (user==null) {
      navigate(from) 
      return
    }
    if (!value) {
      return;
    }
    if (replay==null) {
      axios.post('/api/commentaire/add_comment',{pub_id:props.id,user_id:user.id,description:value},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setafcoments(true)
       
       setcomment({
        submitting: true,
      });
      setTimeout(() => {
          setsubmitting(false)
          setvalue('')
          setrefrech(refresh+1)
      }, 1000);
      
     })
     .catch(error => {
         console.log(error)
        
     });     
     
    }else{

      axios.post('/api/reponse/add_reponse',{comment_id:replay,user_id:user.id,description:value},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
      setnom(null)
      setreaplay(null)
      setcomment({
        submitting: true,
      });
      setTimeout(() => {
          setsubmitting(false)
          setvalue('')
          setrefrech(refresh+1)
      document.getElementById("comment"+props.id).style="display:";
    }, 1000);
  })
    .catch(error => {
      console.log(error)
  });  
  setrefrech(refresh+1) 
  }
  };
  const handleChange = e => {
    setvalue(
       e.target.value
    );
  };
  const supprimer=(id)=>{
    if (user==null) {
      navigate(from) 
    }
    const V=(id)=>{
     
      
   try {
    document.getElementsByClassName("ant-row")[0].children[props.i].style="display:none";
    document.getElementById("p"+props.i).remove();
   } catch (error) {
    document.getElementById("p"+props.i).remove();
   } 
    axios.delete('/api/pub/delete_pub/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
         .then(response => { 
          console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });     
      }
      confirm({
       title: 'voulez vous supprimer ce publication',
       icon: <ExclamationCircleOutlined />,
       content: '',
       onOk() {
         V(id)
       },
       onCancel() {
         console.log('Cancel');
       },
     });    
  }
  const deletcom=(id)=>{
    if (user==null) {
      navigate(from) 
      return
    }
    axios.delete('/api/commentaire/delete_comment/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
      setrefrech(refresh+1)
    })

  }
  const deletrep=(id)=>{
    if (user==null) {
      navigate(from) 
      return
    }
    axios.delete('/api/reponse/delete_reponse/'+id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
    .then(response => { 
      setrefrech(refresh+1)
     })

  
  }



const likepub=()=>{
  if (user==null) {
    navigate(from) 
    return
  }
  axios.post('/api/pub/like_pub/'+user.id +'/'+props.id,{idv:1},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  .then(response => { 
   console.log(response)})

document.getElementById("nblike"+props.id).lastChild.data=parseInt(document.getElementById("nblike"+props.id).lastChild.data)+1
   document.getElementById("disliked"+props.id).style="display:none";
  document.getElementById("liked"+props.id).style="display:";
}
const dislikepub=()=>{
  if (user==null) {
    navigate(from) 
    return
  }
  axios.post('/api/pub/like_pub/'+user.id +'/'+props.id,{},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
  .then(response => { 
   console.log(response)})

document.getElementById("nblike"+props.id).lastChild.data=parseInt(document.getElementById("nblike"+props.id).lastChild.data)-1
   document.getElementById("liked"+props.id).style="display:none";
  document.getElementById("disliked"+props.id).style="display:";
}
const fetshcoment=()=>{
  
if (comments.length <= 0) {
  setafcoments(true)
}else{
  if (document.getElementById("comment"+props.id).style.display==="none") {
    document.getElementById("comment"+props.id).style="display:";
    document.getElementById("aff"+props.id).innerHTML="Mask commentaire"
  }else{
  document.getElementById("comment"+props.id).style="display:none";
  document.getElementById("aff"+props.id).innerHTML="Afficher autre commentaire"}
}}

  
return(
  <div className="pub" id={'p'+props.i}  style={{textAlign:"left"}}>
  <Card 
    cover={
        <Image.PreviewGroup className="espace">
        <Image
          width={'100%'}
          className="imagepub"
          src={props.photo1}
        />
        <Image
        className="imagepub"
          width={'100%'}
          src={props.photo2}
        />
        </Image.PreviewGroup>
    }

    actions={ user ? user.role_as=="admin"   ? [
      !props.liked ?<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id} style={{display:"none"}} /><LikeOutlined onClick={likepub} id={"disliked"+props.id} />{props.like}</p>:<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id}/><LikeOutlined onClick={likepub} id={"disliked"+props.id} style={{display:"none"}} />{props.like}</p>,
      <Link to={"/admin/Modifierpub/"+props.id} style={{float:"right"}}><EditOutlined   /></Link>,
        <DeleteOutlined className="supprimer"  onClick={()=>{supprimer(props.id)}}/> 
    ]:[!props.liked ?<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id} style={{display:"none"}} /><LikeOutlined onClick={likepub} id={"disliked"+props.id} />{props.like}</p>:<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id}/><LikeOutlined onClick={likepub} id={"disliked"+props.id} style={{display:"none"}} />{props.like}</p>,
      <EditOutlined onClick={fetshcoment}/>,
       
    ]:[!props.liked ?<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id} style={{display:"none"}} /><LikeOutlined onClick={likepub} id={"disliked"+props.id} />{props.like}</p>:<p id={"nblike"+props.id}><LikeFilled onClick={dislikepub} id={"liked"+props.id}/><LikeOutlined onClick={likepub} id={"disliked"+props.id} style={{display:"none"}} />{props.like}</p>,
    <EditOutlined onClick={fetshcoment}/>,
  ]
  
 
  }
  >
    <Meta
      avatar={<Avatar src={logo} />}
      title={props.titre}
      description={props.description}
    />
  </Card>
  {comments.length > 0 &&  <List
     style={{display:"none"}}
     id={"comment"+props.id}
     dataSource={comments}
     header={`${comments.length} ${comments.length > 1 ? 'commenter' : 'commenter'}`}
     itemLayout="horizontal"
     renderItem={props =>props}
   />}
  <div className='affichcomment' id={"aff"+props.id} onClick={fetshcoment}>Afficher autres commentaire</div>
        <Comment 
          avatar={
            <Avatar
              src={user?user.photo:''}
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
         
        />
   </div>
    )}
export default Pub;