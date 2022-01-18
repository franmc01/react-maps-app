import {MapContext} from "./MapContext";
import {AnySourceData, LngLatBounds, Map, Marker, Popup} from "mapbox-gl";
import {useContext, useEffect, useReducer} from "react";
import {mapReducer} from "./mapReducer";
import {ReactProps} from "../../interfaces";
import {PlacesContext} from "../places/PlacesContext";
import {directionAPI} from "../../apis";
import {DirectionsResponse} from "../../interfaces/directions";

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
    const {places, userLocation} = useContext(PlacesContext);

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
            adjustZoomMap(newMarkers);
        }

        dispatch({type: 'SET_MARKERS', payload: newMarkers});

    }, [places]);


    const setMap = (map: Map) => {
        new Marker({color: '#1C2C4C'}).setLngLat(map.getCenter()).addTo(map).setPopup(
            new Popup().setHTML(`<h6>Aquí estoy</h6> <p>En algún lugar de aquí</p>`)
        );
        dispatch({type: 'SET_MAP', payload: map})
    };

    const adjustZoomMap = (newMarkers: Marker[]) => {
        const bounds = new LngLatBounds();
        newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
        bounds.extend(userLocation!);

        state.map!.fitBounds(bounds, {
            padding: 200
        });
    }

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
        const response = await directionAPI.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const {distance, duration, geometry} = response.data.routes[0];
        const {coordinates: coords} = geometry;

        let kms = distance / 1000;
        kms = Math.round(kms * 100);
        kms /= 100;

        const minutes = Math.floor(duration / 60);
        console.log({geometry, minutes, kms});

        const bounds = new LngLatBounds(start, start);


        for (const coord of coords) {
            const newCord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCord);
        }

        state.map!.fitBounds(bounds, {
            padding: 200
        });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#32c427',
                'line-width': 3
            }
        })

    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    );
};
