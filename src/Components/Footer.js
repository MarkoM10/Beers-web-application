import React from 'react'
import { useContext } from 'react';
import Context from './Context';
import "../Styles/Footer.css"

const Footer = () => {

    const context = useContext(Context);
    const beersPerPage = context.beersPerPage;
    const totalBeers = context.totalBeers;
    const paginate = context.paginate;

    const pageNumbers = [];

    for(let i = 1; i<=Math.ceil(totalBeers/beersPerPage);i++){
            pageNumbers.push(i);
    }

  return (
    <div className='pagination-box'>
        {pageNumbers.map(number=>{return <ul key={number}><li onClick={()=>paginate(number)} key={number} className="paging-list"><a className='paging-numbers' href='#'>{number}</a></li></ul>})}
    </div>
  )
}

export default Footer