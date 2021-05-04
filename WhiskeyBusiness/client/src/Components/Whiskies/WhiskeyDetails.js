import React, { useEffect, useContext, useState } from "react";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import { useParams, Link } from "react-router-dom";
import Whiskey from "./Whiskey";

export const WhiskeyDetails = () => {
    const { whiskey, getWhiskey } = useContext(WhiskeyContext);
    const { id } = useParams();

    useEffect(() => {
        getWhiskey(id)
    }, []);

    useEffect(() => { console.log(whiskey) }, [whiskey])

    return (
        <div>
            <section className="m-4">
                <p className="text-left px-2">{whiskey.region}</p>
                <img src={whiskey.img_url} alt={whiskey.title} />
                <div>
                    <p>
                        <strong>{whiskey.title}</strong>
                    </p>
                    <p>{whiskey.description}</p>
                    <p>{whiskey.price}</p>
                    <p>{whiskey.rating}</p>

                </div>
            </section>
        </div>
    );

};

export default WhiskeyDetails;