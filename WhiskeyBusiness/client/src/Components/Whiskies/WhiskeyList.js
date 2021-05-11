import React, { useContext, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import Whiskey from "./Whiskey";
import "./Search.css";



export const WhiskeyList = () => {
    const { whiskies, getAllWhiskies, setWhiskies, nextList, prevList, searchWhiskies } = useContext(WhiskeyContext);

    useEffect(() => {
        getAllWhiskies()

    }, []);

    const scrollToRef = (ref) =>
        window.scrollTo(0, ref.current)

    //handles the search fuction for the list of whiskies
    const handleClickSearchList = (event) => {
        event.preventDefault()

        const searchTerm = document.querySelector("#title").value

        if (searchTerm === "") {
            getAllWhiskies()
                .then(setWhiskies)
        } else {
            searchWhiskies(searchTerm)
                .then(setWhiskies)
        }
    }



    if (whiskies != 0) {
        return (
            <>
                <fieldset>
                    <input type="text" id="title" autoFocus className="form-search" placeholder="Title" />
                    <button className="search-button" onClick={handleClickSearchList}>Search Whiskies</button>
                </fieldset>
                <section id="whiskeyContainer">
                    <h1>The Whiskies...</h1>
                    {whiskies.map((whiskey) => {
                        return <Whiskey key={whiskey.id} whiskey={whiskey} />
                    })}

                </section>
                <div>
                    <button className="prevPage" onClick={prevList}>Previous Page</button>

                    <button className="nextPage" onClick={(event) => { nextList(); scrollToRef(whiskies) }}>Next Page</button>
                </div>
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