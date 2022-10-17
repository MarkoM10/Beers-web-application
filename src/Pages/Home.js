import React, {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Beer from '../Components/Beer';
import {getAllBeers} from "../Services/AxiosService";
import "../Styles/Home.css"
import Context from '../Components/Context';
import Footer from '../Components/Footer';

const Home = ({searchTerm,orderType,count,setCount,setCartData,cartData,setClickAddToCart,setClickAddToCart2}) => {


  const navigate = useNavigate();

  const[beers,setBeers] = useState([]);
  const[currentPage,setCurrentPage] = useState(1);
  const beersPerPage = 8;

  useEffect(()=>{


    getAllBeers()
      .then(res => {
        let beersCopy = [...res.data].map(beer=>{
          return {...beer,qt:1,totalPrice:beer.abv,buttonLabel:"Add to cart"}
        })
        // console.log(res,"response");
        let filteredData = searchTerm ? beersCopy.filter((beer)=>beer.name.toLowerCase().includes(searchTerm.toLowerCase())): beersCopy;
        if(orderType==="asc"){
          filteredData.sort((a,b)=>(a.name > b.name ? 1 : -1));
        }if(orderType==="dsc"){
          filteredData.sort((a,b)=>(a.name > b.name ? -1 : 1));
        }
        setBeers(filteredData);
        // console.log(res.data," beers ")
      })
      .catch(err =>{
        console.log(err,"error");
      })

  },[searchTerm,orderType])


  //Get current posts
  const indexOfLastBeer = currentPage*beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer-beersPerPage;
  const currentPost = beers.slice(indexOfFirstBeer,indexOfLastBeer);


  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  const totalBeers = beers.length;

  return (
    <div className='main'>
      <section className='content'>
        {<Beer setClickAddToCart2={setClickAddToCart2} setClickAddToCart={setClickAddToCart} cartData={cartData} setCartData={setCartData} count={count} setCount={setCount} beers={currentPost} navigate={navigate}/>}
      </section>
      <Context.Provider value={{beers,beersPerPage,totalBeers,paginate}}>
          <Footer/>
      </Context.Provider>
    </div>
  )
}

export default Home