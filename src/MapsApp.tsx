import {MapProvider, PlacesProvider} from "./context";
import {HomePage} from "./pages";

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNlc2Nva2x6IiwiYSI6ImNreG5xOWMzbzR0amkydHFoZDFqNWdycjIifQ.o6F3ce_D9o4psnShniVMyw';

const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomePage/>
            </MapProvider>
        </PlacesProvider>
    );
};

export default MapsApp;
