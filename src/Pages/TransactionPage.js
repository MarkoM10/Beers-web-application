import React from 'react'
import "../Styles/TransactionPage.css"
import { useEffect } from 'react'
import MoonLoader from "react-spinners/MoonLoader";
import { useState } from 'react';

const TransactionPage = ({cartData,subTotal}) => {

    console.log(cartData)

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
      },2000)
    },[])


  return (
    <div className='transaction-page-wrapper'>
      {loading?(
          <div className='loader-wrapper'>
            <MoonLoader  loading={loading} size={80} color="#e6a10e"/>
          </div>
        )
        :(
          <div className='transaction-page-container'>
              {cartData.map(beer=>
              <div>
                  <label className='transaction-beer-price' key={beer.id}>Beer name: {beer.name}</label>
                  <label className='transaction-beer-price' key={beer.id}>Price: <span>$</span>{beer.abv}</label>
                  <label className='transaction-beer-price' key={beer.id}>Quantity: {beer.qt}</label>
                  <br></br>
              </div>
              )}
              <hr className='hr-tp'></hr>
              <p className='subtotal-transaction'>Subtotal: <span>$</span>{subTotal}</p>
          </div>
        )
      }
    </div>
  )
}

export default TransactionPage