import {PlacesContext} from "./PlacesContext";
import {useEffect, useReducer} from "react";
import {placesReducer} from "./placesReducer";
import {getUserLocation} from "../../helpers";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({children}: Props) => {

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

