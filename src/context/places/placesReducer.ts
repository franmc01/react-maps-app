import {PlacesState} from "./PlacesProvider";

type PlacesAction = {
    type: 'SET_USER_LOCATION',
    payload: [number, number]
}

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {

    switch (action.type) {
        case 'SET_USER_LOCATION': {
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        }

        default: {
            return state;
        }
    }

}
