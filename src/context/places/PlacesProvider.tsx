import {PlacesContext} from "./PlacesContext";
import {useEffect, useReducer} from "react";
import {placesReducer} from "./placesReducer";
import {getUserLocation} from "../../helpers";
import {ReactProps} from "../../interfaces";
import {searchPlacesAPI} from "../../apis";

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
    }, []);

    const searchPlacesByTerm = async (query: string) => {
        if (query.length === 0) {
            return [];
        }

        if (!state.userLocation) {
            throw new Error("User location not available.");
        }

        const response = await searchPlacesAPI.get(`${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        console.log(response.data);

        return response.data;
    }


    return (
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    );
};

