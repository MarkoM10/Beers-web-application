import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Cart.css"
import Context from '../Components/Context';
import { useNavigate } from 'react-router';

const Cart = () => {
  
  const context = useContext(Context);
  const count = context.count;
  const setCount = context.setCount;
  // const clickAddToCart = context.clickAddToCart;
  // const clickAddToCart2 = context.clickAddToCart2;
  let cartData = context.cartData;
  let setCartData = context.setCartData;
  const subTotal = context.subTotal;
  const setSubTotal = context.setSubTotal;

  const navigate = useNavigate();


  const decrement = (id) =>{
    let newBeers = cartData.map(el=>{
      if(el.id===id && el.qt>1){
       return {...el,qt:el.qt-1,totalPrice:(el.abv*(el.qt-1)).toFixed(1)};
      }else{
        return el;
      }
    })
  setCartData(newBeers);
  if(cartData.map(el=>{
    if(el.qt>1){
      setCount(count-1)
    }
  })){
  }
  }

  const increment = (id) =>{
    console.log(cartData)
    let newBeers = cartData.map(el=>{
      if(el.id===id && el.qt<10){
       return {...el,qt:el.qt+1,totalPrice:(el.abv*(el.qt+1)).toFixed(1)};
      }else{
        return el;
      }
    })
  setCartData(newBeers);
  if(cartData.map(el=>{
    if(el.qt<10){
      setCount(count+1)
    }
  })){
  }
  }

  useEffect(()=>{
      let sum = 0;
      cartData.forEach(element => {
        let totalPrice = parseFloat(element.totalPrice);
        sum += totalPrice; 
      });
      setSubTotal(sum.toFixed(1));
  },[cartData.map(el=>el.totalPrice)]);


  const removeCartItem = (cartId)=>{
    let unremovedBeers = cartData.filter(item=>item.id!==cartId);
    setCartData(unremovedBeers);
    setCount(count-1);
  }

  const openTransactionPage = () =>{
      //ovde setuj loading na true
      navigate("/transactionPage"); 
  }


  return (
    <div>
      {/* <h1 className={clickAddToCart2}>Shopping Cart is empty</h1> */}
        <div className='shopping-cart-wrapper'>
          <div className='shopping-cart-container'>
            <h1 className='cart-heading'>Shopping Cart</h1>
              {cartData.map(beer=>
              <div key={beer.id} className='single-product'>
                  <div className='img-box'>
                    <img src={beer.image_url} alt="beer-image"/>
                  </div>
                  <div className='product-text'>
                    <p>{beer.name}</p>
                    <p>{beer.tagline}</p>
                  </div>
                  <div className='quantity-box'>
                    <input type="button" value="-" onClick={()=>decrement(beer.id)}></input>
                      <span>{beer.qt}</span>
                    <input type="button" value="+" onClick={()=>increment(beer.id)}></input>
                  </div>
                  <div className='product-price'>
                    <p><span className='beer-card-abv'>$</span><label className='beer-card-abv'>{beer.totalPrice}</label></p>
                    <label className='remove-btn' onClick={()=>removeCartItem(beer.id)}>Remove</label>
                  </div>
              </div>
            )
            }
            <div className='subtotal-box'>
                  <h6>Subtotal:<label><span>$</span>{subTotal}</label></h6>
                  <button className='pay-btn' onClick={()=>openTransactionPage()}>Pay</button>
            </div>
          </div>
        </div>
      </div>
  )
}


export default Cart