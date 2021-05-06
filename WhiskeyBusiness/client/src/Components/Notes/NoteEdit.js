import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../../Providers/NoteProvider";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import "./Note.css";

export const NoteEdit = () => {

    const { getNoteById, editNote } = useContext(NoteContext);
    const history = useHistory();
    const noteId = useParams().id;
    console.log("noteId: ", noteId);

    const [note, setNote] = useState({
        Description: "",
        Id: noteId
    });

    console.log("Note: ", note);

    useEffect(() => {
        getNoteById(noteId)
            .then(note => {
                setNote(note)
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const newNote = { ...note };
        let selectedVal = event.target.value;
        //The event.target.id is "name" (the form Input Id)
        newNote[event.target.id] = selectedVal
        setNote(newNote);
    }

    const handleClickSaveNote = (event) => {
        event.preventDefault();
        if (note.Description === "") {
            window.alert("Please provide a description for the note you are trying to create.");
        } else {
            editNote(note)
                .then(() => history.push("/notes"));
        }
    }

    return (
        <>
            <div>
                <Form className="addNoteDiv" onSubmit={handleClickSaveNote}>
                    <Label for="noteInput">New Description</Label>
                    <Input id="Descrition"
                        placeholder="Enter Description"
                        type="text"
                        onChange={handleControlledInputChange}></Input>
                    <Button className="a">Save</Button>
                    <Button className="a" href="/notes">Go Back</Button>
                </Form>
            </div>
        </>
    )
}
export default NoteEdit;