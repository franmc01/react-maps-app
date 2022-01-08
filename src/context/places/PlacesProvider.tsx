import {PlacesContext} from "./PlacesContext";
import {useEffect, useReducer} from "react";
import {placesReducer} from "./placesReducer";
import {getUserLocation} from "../../helpers";
import {ReactProps} from "../../interfaces";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
}

export const PlacesProvider = ({children}: ReactProps) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then(lngLat => dispatch({type: 'SET_USER_LOCATION', payload: lngLat}))
    }, [])


    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            {children}
        </PlacesContext.Provider>
    );
};

