import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import "./WhiskeyCard.css"


export const Whiskey = ({ whiskey }) => {

    if (whiskey.img_url != null) {
        return (
            <div id="whiskeyCard">
                <p>
                    <Link to={`/whiskey/${whiskey.id}`}>
                        <strong>{whiskey.title}</strong>
                    </Link>
                </p>
                <p className="text-left px-2">
                    {whiskey.region}
                </p>
                <Button className="b">
                    <Link className="a" to={`/noteForm/${whiskey.id}`}>+</Link>
                </Button>
                <img id="whiskeyCardImg" src={whiskey.img_url} alt={whiskey.title} />
                <div>
                    <p>{whiskey.description}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div id="whiskeyCard">
                <p>
                    <Link to={`/whiskey/${whiskey.id}`}>
                        <strong>{whiskey.title}</strong>
                    </Link>
                </p>
                <p className="text-left px-2">
                    {whiskey.region}
                </p>
                <Button className="b">
                    <Link className="a" to={`/noteForm/${whiskey.id}`}>+</Link >
                </Button>
                <img id="whiskeyCardImg" src="https://mychildsafetyinstitute.org/wp-content/uploads/2014/07/Profile-Photo-Unavailable.png" alt={whiskey.title} />
                <div>
                    <p>{whiskey.description}</p>
                </div>
            </div>
        )
    }


};

export default Whiskey;