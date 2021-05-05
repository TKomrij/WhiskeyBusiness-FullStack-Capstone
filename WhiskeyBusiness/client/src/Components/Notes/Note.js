import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Note.css";

export const Note = ({ note }) => {

    const currentUser = parseInt(localStorage.getItem("userProfile"))

    const enableButton = currentUser !== null && currentUser.id === note.userProfileId;

    const buttonForUser = () => {
        return (
            <Button className="b">
                <Link className="a" to={`/note/edit/${note.id}`}>
                    Edit
        </Link>
            </Button>
        );
    };

    const deleteForUser = () => {
        return (
            <Button className="b">
                <Link className="a" to={`/note/delete/${note.id}`}>
                    Delete
        </Link>
            </Button>
        );
    };

    return (
        <Card className="m-4">
            <CardBody>
                <p>{note.description}</p>

                <section className="c">
                    <div>{enableButton ? buttonForUser() : null}</div>
                    <div>{enableButton ? deleteForUser() : null}</div>
                </section>
            </CardBody>
        </Card>
    );
};

export default Note;