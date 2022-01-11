import {PlacesContext} from "./PlacesContext";
import {useEffect, useReducer} from "react";
import {placesReducer} from "./placesReducer";
import {getUserLocation} from "../../helpers";
import {ReactProps} from "../../interfaces";
import {searchPlacesAPI} from "../../apis";
import {Feature, PlacesResponse} from "../../interfaces/places";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: true,
    places: []
}

export const PlacesProvider = ({children}: ReactProps) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then(lngLat => dispatch({type: 'SET_USER_LOCATION', payload: lngLat}))
    }, []);

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
        if (query.length === 0) {
            dispatch({type: 'SET_PLACES', payload: []})
            return [];
        }

        if (!state.userLocation) {
            throw new Error("User location not available.");
        }

        dispatch({type: 'SET_LOADING_PLACES'});

        const response = await searchPlacesAPI.get<PlacesResponse>(`${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        dispatch({type: 'SET_PLACES', payload: response.data.features});

        return response.data.features;
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

