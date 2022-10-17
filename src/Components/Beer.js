import React from 'react'

const Beer = ({beers,navigate,setCount,count,setCartData,cartData,setClickAddToCart,setClickAddToCart2}) => {

  const openBeerPage = (beerId) =>{
    navigate(`/${beerId}`);
  }

  const name = (beer) =>{
    return beer.slice(0,-1);
  }

  const lastLetter = (beer) =>{
    return beer.charAt(beer.length - 1);
  }

  const addBeerToCart= (beer,beerId)=>{
      const isBeerInCart = cartData.find(el=>el.id===beer.id);
      let newBeers;
      if (isBeerInCart){
        newBeers = cartData.map(el=>{
          if(el.id===beer.id){
            return {...el,qt:el.qt+1,totalPrice:(el.abv*(el.qt+1)).toFixed(1),buttonLabel:"Product added"};
          }else{
            return el;
          }
        })
      }else{
        newBeers = [...cartData,beer];
      }
    setCartData(newBeers);
    setCount(count+1);
    setClickAddToCart("shopping-cart-container");
    setClickAddToCart2("cart-heading-none");
    }
    
    
  return (
    beers.map(beer => 
      <div className='beer-card' key={beer.id}>
        <div className='beer-img-box'>
        <img src={beer.image_url} alt="beers" className='beer-img' onClick={()=>openBeerPage(beer.id)}/>
        </div>
        <div className='beer-details'>
          <h1 className='beer-name'>{name(beer.name)}<span className='last-letter'>{lastLetter(beer.name)}</span></h1>
          <p className='beer-tagline'>{beer.tagline}</p>
          <p><span className='beer-card-abv'>$</span><label className='beer-card-abv'>{beer.abv}</label></p>
        </div>
        <div className='button-box'>
        <button className='add-to-cart-btn' onClick={() => {addBeerToCart(beer,beer.id)}}>Add to cart</button>
        </div>
      </div>
      )
  )
}

export default Beer