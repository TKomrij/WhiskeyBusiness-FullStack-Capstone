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
            .then((whiskeyObj) => {
                console.log(whiskeyObj)
                setWhiskey(whiskeyObj)
            });
    };


    const searchWhiskies = (searchTerms) => {
        return fetch(`/api/whiskey/search?q=${searchTerms}`)
            .then((res) => res.json())
            .then(setWhiskies);
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
            }}
        >
            {props.children}
        </WhiskeyContext.Provider>
    );
};
export default WhiskeyProvider;