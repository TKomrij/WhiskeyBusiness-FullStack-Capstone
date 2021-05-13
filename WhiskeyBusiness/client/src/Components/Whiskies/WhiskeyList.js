import React, { useContext, useEffect } from "react";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import Whiskey from "./Whiskey";
import "./Search.css";



export const WhiskeyList = () => {
    const { whiskies, getAllWhiskies } = useContext(WhiskeyContext);

    useEffect(() => {
        getAllWhiskies()

    }, []);



    if (whiskies !== 0) {
        return (
            <>
                <section id="whiskeyContainer">
                    <h1>The Whiskies...</h1>
                    {whiskies.map((whiskey) => {
                        return <Whiskey key={whiskey.id} whiskey={whiskey} />
                    })}

                </section>
            </>
        );
    } else {
        return (
            <section id="whiskeyContainer">
                <div>
                    <p>Loading...</p>
                </div>
            </section>
        );
    }
};
export default WhiskeyList;