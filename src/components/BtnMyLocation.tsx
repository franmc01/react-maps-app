import {useContext} from "react";
import {MapContext, PlacesContext} from "../context";
import {IoLocateOutline} from "react-icons/io5";
import { IconContext } from "react-icons";

export const BtnMyLocation = () => {
    const {map, isMapReady} = useContext(MapContext)
    const {userLocation} = useContext(PlacesContext)

    const onClick = () => {
        if (!isMapReady) {
            throw new Error("Map is not ready");
        }

        if (!userLocation) {
            throw new Error("User location is not available");
        }

        map?.flyTo({
            animate: true,
            zoom: 14,
            center: userLocation
        });
    }

    return (
        <IconContext.Provider value={{size: "1.1rem"}}>
            <button
                type="button"
                className="btn btn-primary btn-location"
                onClick={onClick}
            >
                <IoLocateOutline/>
            </button>
        </IconContext.Provider>
    );
};

