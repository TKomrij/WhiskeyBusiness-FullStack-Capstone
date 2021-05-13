import React from "react";
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