import React, { useState, createContext, useContext } from "react"
import { UserProfileContext } from "../Providers/UserProfileProvider";

export const FavoriteContext = createContext()


export const FavoriteProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const { getToken } = useContext(UserProfileContext);

    const getAllFavorites = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken().then((token) =>
            fetch("/api/favorite", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))
            .then(setFavorites)
    };

    const getAllFavoritedWhiskieByUserProfileId = (id) => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken().then((token) =>
            fetch(`/api/favorite/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))
            .then((favoriteObj) => {
                setFavorites(favoriteObj)
            });
    };

    const favoriteCheck = (userProfileId, whiskeyId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/favorite/check/${userProfileId}/${whiskeyId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => console.log(res.json))

            )
    };



    return (
        <FavoriteContext.Provider value={{
            favorites, getAllFavorites, getAllFavoritedWhiskieByUserProfileId, favoriteCheck
        }}>
            {props.children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider;