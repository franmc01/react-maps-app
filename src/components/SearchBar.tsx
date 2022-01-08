import {ChangeEvent, useContext, useRef} from "react";
import {PlacesContext} from "../context";

export const SearchBar = () => {
    const {searchPlacesByTerm} = useContext(PlacesContext);
    const debouncedSearchRef = useRef<NodeJS.Timeout>();

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debouncedSearchRef.current) {
            clearTimeout(debouncedSearchRef.current)
        }

        debouncedSearchRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 800);
    }

    return (
        <div className={"searchbar-container"}>
            <input type="text"
                   className={"form-control"}
                   placeholder="Search a place"
                   onChange={onQueryChange}
            />
        </div>
    );
};
