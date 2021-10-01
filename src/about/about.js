import React, { Component } from 'react';
import './about.scss';
import magasin from './images.jpeg'
class About extends Component
{
 
       render(){
         return(
   <div className="About">
       <div className="what">
          <h1>JED AUTO </h1>
          <p>
          JED AUTO est un centre d’entretien automobile, vous propose les services de
dépannage, remorquage, réparation et diagnostic de type de véhicule.
          </p>
       </div>
       <div className="ltnumber">
            <h1>Lets talk numbers</h1>
           <ul className="liste">
               <li  className="branch"><p className="numbre">1</p><p>branch</p></li>
               <li className="employee"><p className="numbre">12</p><p>employee</p></li>
               <li className="yos"><p className="numbre">1</p><p>years of service</p></li>
           </ul>
        </div>
        <div className="membres">
        <h1>Members</h1>
        <div className="info">
        <div> 
        <div>
         <div className="imge">
           <img  src={magasin}/>
         </div>
        </div> 
        
             </div>
        </div>
        </div>
       </div>
    
         )
     
         
       }

}

export default About;