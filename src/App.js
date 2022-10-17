import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import Cart from "./Pages/Cart";
import Context from "./Components/Context";
import TransactionPage from "./Pages/TransactionPage";

function App() {


  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
  const[clickAddToCart,setClickAddToCart] = useState("shopping-cart-container-none");
  const[clickAddToCart2,setClickAddToCart2] = useState("cart-heading2");
  const[cartData,setCartData] = useState([]);
  const[searchTerm,setSearchTerm] = useState("");
  const[orderType,setOrderType] = useState("");
  const[count,setCount] = useState(cartFromLocalStorage);
  const[subTotal,setSubTotal]=useState(0);
  

  return (          
    <div className='main-wrapper'>
      <BrowserRouter>
        <Navbar count={count}  setSearchTerm={setSearchTerm} setOrderType = {setOrderType}/>
            <Routes>
                    <Route path="/" index element={<Home setClickAddToCart2={setClickAddToCart2} setClickAddToCart={setClickAddToCart} count={count} setCount={setCount} cartData={cartData} setCartData={setCartData}  searchTerm={searchTerm} orderType={orderType} />}/>
                    <Route path=":id" element={<ProductPage setCount={setCount} count={count} cartData={cartData} setCartData={setCartData}/>}/>
                    <Route path="/cart" element={
                      <Context.Provider value={{cartData,count,setCount,clickAddToCart,clickAddToCart2,setCartData,subTotal,setSubTotal}}>
                        <Cart/>
                      </Context.Provider>}/>
                      <Route path="/transactionPage" element={<TransactionPage cartData = {cartData} subTotal={subTotal}/>}/>
            </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App;