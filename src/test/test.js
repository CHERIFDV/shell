import {Image ,Button } from 'antd';
import './addvoiture.scss';
import React,{ useState } from 'react';
import Webcam from "react-webcam";
import axios from'axios';
import LoadingPage from "../../loading/LoadingPage";
import { useNavigate, useLocation } from "react-router-dom";


import { Select } from 'antd';

const { Option } = Select;






function Photo(props) {
  const navigate = useNavigate();
 const { state } = props.location
  const [loading,setloading]=useState(false);

 
  const [webcam, setwebcam] = React.useState();

    const [imgSrc, setImgSrc] = React.useState([]);
    const [id, setid] = useState(null);
    
      
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);
  
    const handleDevices = React.useCallback(
      mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );
  
    React.useEffect(
      () => {
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
              navigator.mediaDevices.enumerateDevices().then(handleDevices);
             })
             .catch(function (e) {  });
        }
        else {
        navigator.getWebcam({  video: true }, 
             function (stream) {
                     navigator.mediaDevices.enumerateDevices().then(handleDevices);
             }, 
             function () {  });
        }



        navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
    );
    
   const  stop = () => {
    setTimeout(
      () => document.getElementById('cam').remove, 
      1
    );
     try {
      let stream = webcam.video.srcObject;
      const tracks = stream.getTracks();
    
      tracks.forEach(track => track.stop());
        console.log(tracks)
      
     } catch (error) {
      
     }
      
    };
    let b=[...imgSrc]
    
    const capture = React.useCallback(() => {
      const imageSrc = webcam.getScreenshot();
     if (b.length<4) {
      b.push(imageSrc)
      setImgSrc(b);  
     }
    }, [webcam, setImgSrc,b]);
   const handleChange=(value)=> {
     console.log(value)
        setid(value)
    }
    const reset=()=> {
        setImgSrc([]);
    
    }

    const resetlast=()=> {
        b.splice(-1, 1);
        setImgSrc(b)
    }
   const  dataURLtoBlob = (dataurl) => {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
  }
    const submit=async()=>{
      setloading(true)
      if(b.length=4){
        const fd = new FormData();
       
        imgSrc.map(function(item,i){
          fd.append('image'+(i+1),dataURLtoBlob(item));       
         }) 
      axios.post('../api/personnel/add_photo/'+state.id,fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }} )
    .then(response => { 
      setloading(false)
     let { from } = { from: { pathname: "./tache",state:state}};
       navigate(from); 
   })
   .catch(error => {
       console.log(error)
   });  
    }}

  return (
    
    <div className="addvoitur">
      {loading?<LoadingPage/> :<></>}
       <br/>
      <Select  style={{ width: 120 }} onChange={handleChange}>
    {devices.map((device, key) => (
      <Option value={device.deviceId} >{device.label}</Option>
      ))}
    </Select>
       <div id='cam'>{
       
     <>
       <Webcam
       front={false}
        audio={false}
        ref={(webcam) => {
          setwebcam(webcam)
          }}
        videoConstraints={{ deviceId: id }}
        screenshotFormat="image/jpeg"
        style={{width:"100%"}}

      />
    
    </>
     
    }</div>
        <Button onClick={capture}>Capture photo</Button><Button onClick={resetlast} >Reset last</Button><Button onClick={reset} >Reset all</Button>
        {imgSrc && (
           imgSrc.map(function(item){
                       
            return(
             <Image
             src={item}
           />
            )


           }) 
        )}
        <br></br>
         <Button onClick={submit}> Envoyer</Button>
      </div>

   
  );
}


export default Photo;
