import React, { useContext, useEffect, useParams } from "react";
import { FavoriteContext } from "../../Providers/FavoriteProvider";
import { FavoriteCard } from "./FavoriteCard";

export const FavoriteList = () => {
    const { favorites, getAllFavoritedWhiskieByUserProfileId } = useContext(FavoriteContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    //useEffect - reach out to the world for something
    useEffect(() => {
        getAllFavoritedWhiskieByUserProfileId(currentUser.id)
    }, [])


    if (favorites !== 0) {
        return (
            <div className="favorites">
                {
                    favorites.map(favorite => {
                        return <FavoriteCard key={favorite.id} favorite={favorite} />
                    })
                }
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

}
export default FavoriteList;