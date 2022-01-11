import {PlacesContext} from "../context";
import {useContext} from "react";
import {Feature} from "../interfaces/places";

export const SearchResult = () => {

    const {places} = useContext(PlacesContext);

    return (
        <ul className={(places.length > 0) ? 'list-group mt-3' : 'list-group'}>

            {
                places.map((place: Feature) => (
                    <li key={place.id} className="list-group-item list-group-item-action">
                        <h6>{place.text_es}</h6>
                        <p className={'text-muted'} style={{fontSize: '12px'}}>
                            {place.place_name}
                        </p>
                        <button className={'btn btn-outline-primary btn-sm'}>
                            Trazar ruta
                        </button>
                    </li>
                ))
            }

        </ul>
    );
};
