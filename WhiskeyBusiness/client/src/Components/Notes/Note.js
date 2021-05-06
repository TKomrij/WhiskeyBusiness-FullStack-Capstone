import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { NoteContext } from "../../Providers/NoteProvider";
import "./Note.css";

export const Note = ({ note }) => {

    const currentUser = parseInt(localStorage.getItem("userProfile"))

    return (
        <Card className="m-4">
            <CardBody>
                <p>{note.description}</p>

                <section className="c">
                    <Button className="b">
                        <Link className="a" to={`/note/edit/${note.id}`}>Edit</Link>
                    </Button>
                    <Button className="b">
                        <Link className="a" to={`/note/delete/${note.id}`}>Delete</Link>
                    </Button>
                </section>
            </CardBody>
        </Card>
    );
};

export default Note;