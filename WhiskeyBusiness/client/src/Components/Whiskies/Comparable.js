import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import "./WhiskeyCard.css"


export const Comparable = ({ comparable }) => {


    return (
        <div id="whiskeyCard">
            <p>
                <Link to={`/whiskey/${comparable.id}`}>
                    <strong>{comparable.title}</strong>
                </Link>
            </p>
            <p className="text-left px-2">
                {comparable.region}
            </p>
            <Button className="b">
                <Link className="a" to={`/noteForm/${comparable.id}`}>+</Link>
            </Button>
            <img id="whiskeyCardImg" src={comparable.img_url} alt={comparable.title} />
            <div>
                <p>{comparable.description}</p>
            </div>
        </div>
    );
};

export default Comparable;