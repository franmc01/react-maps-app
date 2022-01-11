import {MapContext} from "./MapContext";
import {Map, Marker, Popup} from "mapbox-gl";
import {useContext, useEffect, useReducer} from "react";
import {mapReducer} from "./mapReducer";
import {ReactProps} from "../../interfaces";
import {PlacesContext} from "../places/PlacesContext";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[]
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

export const MapProvider = ({children}: ReactProps) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const {places} = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach((marker) => {
            marker.remove();
        });

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const newMarker = new Marker().setLngLat([lng, lat]).addTo(state.map!).setPopup(
                new Popup().setHTML(`<h6>${place.text_es}</h6> <p>${place.place_name_es}</p>`)
            );
            newMarkers.push(newMarker);
        }

        dispatch({type: 'SET_MARKERS', payload: newMarkers});

        return () => {
            console.log(places)
        };
    }, [places]);


    const setMap = (map: Map) => {
        new Marker({color: '#1C2C4C'}).setLngLat(map.getCenter()).addTo(map).setPopup(
            new Popup().setHTML(`<h6>Aquí estoy</h6> <p>En algún lugar de aquí</p>`)
        );
        dispatch({type: 'SET_MAP', payload: map})
    };


    return (
        <MapContext.Provider value={{
            ...state,
            setMap
        }}>
            {children}
        </MapContext.Provider>
    );
};
