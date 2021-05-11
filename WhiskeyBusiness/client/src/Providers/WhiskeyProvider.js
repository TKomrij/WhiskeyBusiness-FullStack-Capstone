import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const WhiskeyContext = React.createContext();

export const WhiskeyProvider = (props) => {
    const api = "https://evening-citadel-85778.herokuapp.com:443/whiskey"
    const { getToken } = useContext(UserProfileContext);
    const [whiskies, setWhiskies] = useState([]);
    const [whiskey, setWhiskey] = useState({});
    const [searchTerms, setSearchTerms] = useState("");

    const getAllWhiskies = () => {
        return getToken()
            .then((token) =>
                fetch(`${api}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then((whiskeyObj) => {
                setWhiskies(whiskeyObj.results)
            });
    };


    const getWhiskey = (id) => {
        return getToken().then((token) =>
            fetch(`${api}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        )
    };

    const getMyWhiskies = () => {
        return getToken()
            .then((token) =>
                fetch("/api/whiskey/MyWhiskies", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((resp) => resp.json())
            )
            .then(setWhiskies);
    };


    const nextList = () => {
        if (whiskies.next !== null) {
            fetch(`${whiskies?.next}`)
                .then(response => response.json())
                .then(setWhiskies)
        }
    }

    //fetches the previous set of whiskies
    const prevList = () => {
        if (whiskies.previous !== null) {
            fetch(`${whiskies?.previous}`)
                .then(response => response.json())
                .then(setWhiskies)
        }
    }

    //allow for the searching of games through the list
    const searchWhiskies = (term) => {
        if (term != "") {
            return fetch(`${api}?search=${term}&page_size=50`)
                .then(response => response.json())
                .then(setWhiskies)
        }
    }


    return (
        <WhiskeyContext.Provider
            value={{
                whiskies,
                getAllWhiskies,
                whiskey,
                getWhiskey,
                searchWhiskies,
                setSearchTerms,
                searchTerms,
                getMyWhiskies,
                setWhiskey,
                nextList,
                prevList,
            }}
        >
            {props.children}
        </WhiskeyContext.Provider>
    );
};
export default WhiskeyProvider;