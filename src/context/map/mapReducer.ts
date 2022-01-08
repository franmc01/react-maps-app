import {MapState} from "./MapProvider";
import {Map} from "mapbox-gl";

type MapAction = { type: 'SET_MAP', payload: Map }

export const mapReducer = (state: MapState, action: MapAction): MapState => {
    switch (action.type) {
        case "SET_MAP": {
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
