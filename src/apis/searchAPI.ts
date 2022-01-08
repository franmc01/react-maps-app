import axios from "axios";

const SearchAPI = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiZnJhbmNlc2Nva2x6IiwiYSI6ImNreG5xOWMzbzR0amkydHFoZDFqNWdycjIifQ.o6F3ce_D9o4psnShniVMyw',
    }
});

export default SearchAPI;
