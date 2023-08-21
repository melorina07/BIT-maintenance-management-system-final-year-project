import React, { useEffect, useState } from 'react';
import Logo2 from "../assets/logo2.jpg"
import { Button } from 'react-scroll';
import { useTranslation } from "react-i18next";

import './Addmin.css'
import useUserService from '../services/userService';
import Nav from './Nav';


const Addmin = () =>{
  



    const { t } = useTranslation(["common", "Login"]);
    const userService = useUserService()
    const [users, setUsers] = useState([])

    useEffect(() => {
      userService.getUsers().then(value => {
        setUsers(value.data.users)
      })
      console.log(users)
    }, [])


 return (
  <div className='bg-[#c9e5f3]'>

<div className="flex-0.2">
        <img src={Logo2} alt='Logo Image' style={{ width:1800 ,height:150 }} />
      </div>
      <Nav />
      <p className=' font-bold text-center text-[30px] text-black'>{t("common:manage")}</p>
      
      <div className="List d-flex">
      <table className="table table-hover justify-content-right  justify-content-center mb-20" style={{ width: "95%",}}>
  <thead>
    <tr >

      <th scope="col" >ID</th>
      <th scope="col" >Full Name</th>
      <th scope="col" >Faculty</th>
      <th scope="col" >Phone Number</th>
      <th scope="col" >Email</th>
      <th scope="col" >Access Level</th>
      
    </tr>

  </thead>
  <tbody>
    {users.map(user => (
       <tr>
       <td >{user.id}</td>
       <td>{user.name}</td>
       <td>FECE</td>
       <td>0909438167</td>
       <td>{user.email}</td>
       <td>{user.role}</td>
     </tr>
    ))}
  </tbody>
</table>

 
      </div>
      </div>
      
      
 );
} 
export default Addmin;