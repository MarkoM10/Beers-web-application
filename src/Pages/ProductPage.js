import React from 'react'
import {useParams} from "react-router-dom";
import { useEffect,useState } from 'react';
import {getBeerById} from "../Services/AxiosService";
import "../Styles/ProductPage.css"

const BeerDetails = ({cartData,setCartData,setCount,count}) => {

  const {id} = useParams();

  const[addToCartBtn,setAddToCartBtn] = useState("Add to cart");
  const [beer,setBeer] = useState({});

  useEffect(()=>{

    getBeerById(id)
    .then(res => {
      let newData = res.data[0];
      let beersCopy = {...newData,qt:1,totalPrice:newData.abv};
      setBeer(beersCopy);
      // console.log(res.data[0]," beers ")
    })
    .catch(err =>{
      console.log(err,"err");
    })
  },[id]);

  // console.log(cartData, " beer iz product page ");

  const addBeerToCart= ()=>{
    let newBeers;
      const isBeerInCart = cartData.find(el=>el.id===beer.id);
      if (isBeerInCart){
        newBeers = cartData.map(el=>{
          if(el.id===beer.id){
            return {...el,qt:el.qt+1,totalPrice:(el.abv*(el.qt+1)).toFixed(1)};
          }else{
            return el;
          }
        })
      }else{
        newBeers = [...cartData,beer];
      }
      setCartData(newBeers);
      setCount(count+1);
      setAddToCartBtn("Product added");

      setTimeout(() => {
        setAddToCartBtn(addToCartBtn);
      }, 2000);
  }

  // console.log(beer)

  return (
        <div className='product-page-wrapper'>
            <div className='product-page-container'>
                <div className='product-page-img'>
                  <img alt='beer' src={beer.image_url}/>
                </div>
                <div className='product-page-details'>
                  <div className='details'>
                      <div className='details-header'>
                          <h1>{beer.name}</h1>
                          <label className='price-label'><span>$</span>{beer.abv}</label>
                      </div>
                      <hr className='hr'></hr>
                      <p>{beer.description}</p>
                      <p>Food Pairing: </p>
                      <p>{beer.food_pairing?.map(el=><li className='food-pairing-list' key={el.id}>{el}</li>)}</p>
                      <hr className='hr'></hr>
                      <div className='product-page-btn-box'>
                        <button onClick={()=>addBeerToCart()}>{addToCartBtn}</button>
                      </div>
                  </div>
                </div>
            </div>
        </div>
  )
}

export default BeerDetails