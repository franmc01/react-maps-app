import {PlacesProvider} from "./context";
import {HomePage} from "./pages";

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNlc2Nva2x6IiwiYSI6ImNreG5xOWMzbzR0amkydHFoZDFqNWdycjIifQ.o6F3ce_D9o4psnShniVMyw';

const MapsApp = () => {
    return (
        <PlacesProvider>
            <HomePage/>
        </PlacesProvider>
    );
};

export default MapsApp;
