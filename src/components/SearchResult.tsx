import {MapContext, PlacesContext} from "../context";
import {useContext, useState} from "react";
import {Feature} from "../interfaces/places";

export const SearchResult = () => {

    const {map, getRouteBetweenPoints} = useContext(MapContext);
    const {places, userLocation} = useContext(PlacesContext);
    const [activePlaceId, setActivePlaceId] = useState<string>('');

    const onPlaceClick = (place: Feature) => {
        const [lng, lat] = place.center;
        setActivePlaceId(place.id);
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = async (place: Feature) => {
        if (!userLocation) return;
        const [lng, lat] = place.center;

        await getRouteBetweenPoints(userLocation, [lng, lat])
    }

    return (
        <ul className={(places.length > 0) ? 'list-group mt-3' : 'list-group'}>

            {
                places.map((place: Feature) => (
                    <li key={place.id}
                        className={`list-group-item list-group-item-action pointer ${activePlaceId === place.id ? 'active' : ''}`}
                        onClick={() => onPlaceClick(place)}
                    >
                        <h6>{place.text_es}</h6>
                        <p style={{fontSize: '12px'}}>
                            {place.place_name}
                        </p>
                        <button
                            onClick={() => getRoute(place)}
                            className={`btn btn-sm ${activePlaceId === place.id ? 'btn-outline-light' : 'btn-primary'}`}>
                            Trazar ruta
                        </button>
                    </li>
                ))
            }

        </ul>
    );
};
