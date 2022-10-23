import React, { useContext, useState } from 'react'
import logo from '../Images/logo.png'
import "../Styles/Navbar.css"
import asc from '../Images/asc.png'
import dsc from '../Images/dsc.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Context from './Context'

const Navbar = () => {

  const context = useContext(Context);
  console.log(context);
  const setSearchTerm = context.setSearchTerm;
  const setOrderType = context.setOrderType;
  const count = context.count;
  
    const searchFilter = (event) =>{
        setSearchTerm(event);
    }

    const sortBeers = (category)=>{
      setOrderType(category);
  }

  useEffect(()=>{
      localStorage.setItem("cart",count)
  },[count])

  return (
    <nav className='nav'>
        <a href='/'>
          <img className='logo' src={logo} alt="beer-logo"/>
        </a>
        <div className='search-bar-box'>
          <input className='search-bar' type="text" placeholder="Search for beers..." onChange={(event)=>searchFilter(event.target.value)}></input>
            <img className='up-arrow' alt='uparrow' src={asc} onClick={()=>sortBeers("asc")}/>
            <img className='down-arrow' alt='downarrow' src={dsc} onClick={()=>sortBeers("dsc")}/>
        </div>
        <ul>
            <li><Link to='/'><FontAwesomeIcon className='home-icon' icon={faHouse} /></Link></li>
            <li><Link to="/cart"><FontAwesomeIcon className='cart-icon' icon={faCartShopping} /></Link><span className="circle">{count}</span></li>
        </ul>
    </nav>
  )
}


export default Navbar