import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Hello = () => {
  return (
    <div>
            <h6>Hello Alfy, Welcome to Tuaneka. How can we help you today?</h6>
            <div className="flex gap-2">
                <Link to='/chatpage'>
                <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I need a new invoice</button>
                </Link>
                <button className='text-white bg-pink-600 rounded-xl text-sm p-1 px-5'>I want to list my previous invoices</button>  
            </div>      
    </div>
  )
}

export default Hello
