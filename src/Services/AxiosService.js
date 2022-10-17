import axios from "axios";

// axios.get("https://api.punkapi.com/v2/beers");

const baseUrl = "https://api.punkapi.com/v2/beers";

 export const getAllBeers = () =>{
    return axios.get(baseUrl);

}

export const getBeerById = (id) =>{
    return axios.get(`${baseUrl}/${id}`);
}


// const createBeer = (data) =>{
//     return axios.post(`${baseUrl}`,data);
// }

// export {getAllBeers,getBeerById};
