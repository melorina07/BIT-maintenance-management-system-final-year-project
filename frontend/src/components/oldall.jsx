import React from "react";
import Logo from '../assets/logo.jpg';
import { BiChevronDown } from 'react-icons/bi';
const All = () =>{

    return(
 <div name='all' className='w-full h-screen bg-[#aac8ce]'>

     <div className="flex-0.2">
        <img src={Logo} alt='Logo Image' style={{ width: '2000px' ,height:'150px' }} />
      </div>


      <div className=" bg-[#f0f1f1] flex-0.5 ">
     <p className=' text-center font-extrabold text-[30px] text-black'>የባህርዳር ቴክኖሎጂ ኢንስቲትዩት የጥገና ስራ ምጠየቂያ ቅፅ </p>
     </div>


<div className="flex text-red">
<div className='flex gap-5 '>
     <p className=' text-left text-[20px]'> የጠያቂው ሙሉ ስም  </p>
     <input type="text"  className="  border-0 w-[200px] h-10"/>
     
     </div>
     <div className="flex gap-5">
     <p className="text-left text-[20px] border-0 w-[200px]">  የሚገኝበት የስራ ክፍል  </p>
     
     <div className="relative  ">
        
            <select  className="w-full p-2.5 text-black-400 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-400">
             <option value="">--Please choose an option--</option><BiChevronDown/>
                <option>electrical and computer eng</option>
                <option>food and chemical</option>
                <option>computing</option>
                <option>industriyal and auto</option>
            </select>
        </div>
        <p className=' text-left text-[20px]'>ስልክ  </p>
     <input type="number"  className=" border-0 w-[200px] h-10"/>
     </div>

     </div>
<div className="flex">
     <div className='flex gap-5'>
     <p className=' text-left text-[20px] text-black'>የጠያቂው ክፍል/ስራ ባለቤት/ ኃላፊ ስም</p>
     <input type="text"  className="  border-0 w-[200px] h-10"/>
     

     <p className=' text-left text-[20px] text-black'>ስልክ  </p>
     <input type="number"  className=" border-0 w-[200px] h-10"/>
    
     </div>

     </div>
</div>እንዲሰራ የተጠየቀው የስራ አይነት
    )
}
export default All;
