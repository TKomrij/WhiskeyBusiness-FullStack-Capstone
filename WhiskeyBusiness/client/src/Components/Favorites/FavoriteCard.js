import React from "react"
import { Link } from "react-router-dom"

export const FavoriteCard = ({ favorite }) => (

    <section>
        <h3><Link to={`/whiskey/${favorite.whiskey.id}`}>{favorite.whiskey.name}</Link></h3>
        <button>Favorite</button>

    </section>
)