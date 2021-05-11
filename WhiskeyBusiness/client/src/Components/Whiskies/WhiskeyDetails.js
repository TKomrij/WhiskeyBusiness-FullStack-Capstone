import React, { useEffect, useContext, useState } from "react";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import { useParams, Link } from "react-router-dom";
import Whiskey from "./Whiskey";
import Comparable from "./Comparable";
import Review from "./Review";

export const WhiskeyDetails = () => {
    const { whiskey, getWhiskey, setWhiskey } = useContext(WhiskeyContext);
    const { id } = useParams();

    useEffect(() => {
        getWhiskey(id)
            .then((whiskeyObj) => {
                setWhiskey(whiskeyObj)
            })
    }, [id]);


    if (Object.keys(whiskey).length !== 0) {
        return (
            <div>
                <section className="m-4">
                    <p><strong>{whiskey.title}</strong></p>
                    <p className="text-left px-2">{whiskey.region}</p>
                    <button>Favorite</button>
                    <img src={whiskey.img_url} alt={whiskey.title} />
                    <div>

                        <p>{whiskey.description}</p>
                        <p>Price: {whiskey.price}</p>
                        <p>Rating: {whiskey.rating}</p>
                        <div>
                            {whiskey.comparables.map((comparable) => {

                                return <Comparable key={comparable.id} comparable={comparable} />
                            })}
                        </div>
                        <div>
                            <h3>Reviews</h3>
                            {whiskey.reviews.map((review) => {

                                return <Review key={review.id} review={review} />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }

};

export default WhiskeyDetails;