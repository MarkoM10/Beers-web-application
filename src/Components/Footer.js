import React from 'react'
import { useContext } from 'react';
import Context from './Context';
import "../Styles/Footer.css"

const Footer = () => {

    const context = useContext(Context);
    const beersPerPage = context.beersPerPage;
    const totalBeers = context.totalBeers;
    const paginate = context.paginate;

    // console.log(postsPerPage, totalPosts)

    //Paginacija objasnjenje: pravimo for petlju kojom prolazimo kroz niz cija je duzina onolika koliko piva ima, taj broj delimo sa brojem piva koji zelimo da prikazemo
    //Dobijeni broj je zapravo broj stranica koji cemo imati i njega smestamo u prazan niz. Nakon toga prolazimo kroz taj niz i iscrtavamo svaki broj tog niza kako bi na svaki pojedinacan
    //stavili onClick, taj onClick poziva funkciju iz Home-a koji setuje taj broj sto smo kliknuli u state koji nosi vrednost currentPage-a.
    //Sada current page vise nije 1 nego 2, pa samim tim se i menjaju indeksi prvog i poslednjeg piva. Koji sada u nasem slucaju postaju 8 i 16. Secemo metodom slice sada taj niz i vracamo tih drugih 8 piva.

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