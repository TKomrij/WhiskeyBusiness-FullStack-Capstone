import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import { TagContext } from "../../Providers/TagProvider";

import "./Note.css";

export const Note = ({ note }) => {

    const { getWhiskey } = useContext(WhiskeyContext);
    const [currentWhiskey, setCurrentWhiskey] = useState();
    const { getTagsByNoteId } = useContext(TagContext);
    const [noteTags, setNoteTags] = useState();

    useEffect(() => {
        getWhiskey(note.whiskeyId)
            .then((whiskeyObj) => {
                setCurrentWhiskey(whiskeyObj)
            })
        getTagsByNoteId(note.id)
            .then((noteTagObj) => {
                setNoteTags(noteTagObj)
            })
    }, []);

    const renderNoteTags = (noteTags) => {
        if (noteTags && noteTags.length) {
            return <p>Tags: {noteTags.map((noteTag) => {

                return (<strong>#{noteTag.name} </strong>)
            })}</p>
        } else {
            return <div></div>
        }
    }


    useEffect(() => {
        console.log(noteTags)
    }, [noteTags])

    if (currentWhiskey) {
        return (
            <Card className="m-4">
                <CardBody>
                    <h3>{currentWhiskey.title}</h3>
                    <h5>{currentWhiskey.region}</h5>
                    <p>{note.description}</p>
                    {renderNoteTags(noteTags)}
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