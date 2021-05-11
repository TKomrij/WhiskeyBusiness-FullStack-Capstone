import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import "./WhiskeyCard.css"


export const Review = ({ review }) => {
    return (
        <>
            <p>{review.title}</p>
            <p>{review.text}</p>
        </>
    );
};

export default Review;