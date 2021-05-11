import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { NoteContext } from "../../Providers/NoteProvider";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";

import "./Note.css";

export const Note = ({ note }) => {

    const { whiskey, getWhiskey } = useContext(WhiskeyContext);
    const [currentWhiskey, setCurrentWhiskey] = useState();
    const currentUser = parseInt(localStorage.getItem("userProfile"))

    useEffect(() => {
        getWhiskey(note.whiskeyId)
            .then((whiskeyObj) => {
                setCurrentWhiskey(whiskeyObj)
            })
    }, []);

    if (currentWhiskey) {
        return (
            <Card className="m-4">
                <CardBody>
                    <h3>{currentWhiskey.title}</h3>
                    <h5>{currentWhiskey.region}</h5>
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
    } else {
        return (
            <div></div>
        )
    }
};

export default Note;