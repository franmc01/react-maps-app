import {MapContext} from "./MapContext";
import {Map, Marker, Popup} from "mapbox-gl";
import {useReducer} from "react";
import {mapReducer} from "./mapReducer";
import {ReactProps} from "../../interfaces";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}

export const MapProvider = ({children}: ReactProps) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const setMap = (map: Map) => {
        new Marker().setLngLat(map.getCenter()).addTo(map).setPopup(
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
