import React from 'react';
import Logo2 from "../assets/logo2.jpg"
import { Button } from 'react-scroll';
import { useTranslation } from "react-i18next";

import './Addmin.css'


const Admin = () =>{
  



    const { t } = useTranslation(["common", "Login"]);
 



 return (
  <div className='bg-[#c9e5f3]'>

<div className="flex-0.2">
        <img src={Logo2} alt='Logo Image' style={{ width:1800 ,height:150 }} />
      </div>
      <nav>
 <a href={"/Admin"}>Teachnicians</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <a href={"/AddTechnician"}>Add technicians</a>
 <a href={"/Upppdate"}>Update</a>
 </nav>
      <p className=' font-bold text-center text-[30px] text-black'>Technicians</p>
      
      <div className="List d-flex">
      <table className="table table-hover justify-content-right  justify-content-center" style={{ width: "95%",}}>
  <thead>
    <tr >

      <th scope="col" >ID</th>
      <th scope="col" >Full Name</th>
      <th scope="col" >Phone Number</th>
      <th scope="col" >Email</th>
      <th scope="col" >Skill</th>
      
    </tr>

  </thead>
  <tbody>
    <tr>
      <td >1</td>
      <td>Mikias Mitiku</td>
      <td>FECE</td>
      <td>0909438167</td>
      <td>plumber</td>
      
    </tr>
    <tr>
      <td>2</td>
      <td>Natnael Moges</td>
      <td>FECE</td>
      <td>0912761878</td>
      <td>plumber</td>
      
    </tr>
    <tr>
      <td>3</td>
      <td>Hailu Berhanu</td>
      <td>FECE</td>
      <td>0913259654</td>
      <td>Electrician</td>
      
    </tr>
  </tbody>
</table>

 
      </div>
      </div>
      
      
 );
} 
export default Admin;