import React, { useContext, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import Whiskey from "./Whiskey";
import "./Whiskey.css"



export const WhiskeyList = () => {
    const { whiskies, getAllWhiskies, setWhiskies } = useContext(WhiskeyContext);

    useEffect(() => {
        getAllWhiskies()

    }, []);

    useEffect(() => { console.log(whiskies) }, [whiskies])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         searchPosts(searchTerms)
    //     } else {
    //         getPostsWithComments()
    //     }
    // }, [searchTerms])

    if (whiskies != 0) {
        return (
            <section id="whiskeyContainer">
                <h1>The Whiskies...</h1>
                {whiskies.map((whiskey) => {
                    return <Whiskey key={whiskey.id} whiskey={whiskey} />
                })}
            </section>
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