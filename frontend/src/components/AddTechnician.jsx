import React from 'react';
import Logo2 from "../assets/logo2.jpg"
import { Button } from 'react-scroll';
import { useTranslation } from "react-i18next";

import './Uppdate.css'


const AddTechnician = () =>{
  
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
           <p className=' font-extrabold text-center text-[30px] text-black'>{t("common:create")}</p>
         
         
<div className="update" >
  <form >
    <label for="name" placeholder="Full Name">Full Name:</label><br/>
    <input placeholder="Full Name" type="text" id="name" name="name"/><br/>
    <label for="role">Email:</label><br/>
    <input placeholder="Email" type="text" id="role" name="role"/><br/>
    <label for="role">Phone Number:</label><br/>
    <input placeholder="Phone Number" type="text" id="role" name="role"/><br/>
    <label for="role">Address:</label><br/>
    <input placeholder="Address" type="text" id="role" name="role"/><br/>
    <label for="role">Skill:</label><br/>
    <input placeholder="Skill" type="text" id="role" name="role"/><br/>
    <button type="submit" 
                
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 mt-6 mb-10"
              >
                     Add New Technician
               
                </button>
  </form>
</div>
      
      </div>
      
      
 );
} 
export default AddTechnician;