import axios from 'axios';


const directionsAPI = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZnJhbmNlc2Nva2x6IiwiYSI6ImNreG5xOWMzbzR0amkydHFoZDFqNWdycjIifQ.o6F3ce_D9o4psnShniVMyw',
    }
})


export default directionsAPI;
