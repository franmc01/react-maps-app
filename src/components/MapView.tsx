import {useContext, useLayoutEffect, useRef} from "react";
import {MapContext, PlacesContext} from "../context";
import {Loading} from "./Loading";
import {Map} from "mapbox-gl";

export const MapView = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const {isLoading, userLocation} = useContext(PlacesContext);
    const {setMap} = useContext(MapContext)

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 12 // starting zoom
            });
            
            setMap(map);
        }
    }, [isLoading, userLocation])

    if (isLoading) {
        return (<Loading/>)
    }

    return (
        <div ref={mapDiv}
             style={{
                 height: "100vh",
                 width: "100vw",
                 position: "fixed",
                 left: 0,
                 right: 0
             }}>
        </div>
    );
};
