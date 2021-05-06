import React, { useContext } from "react";
import { NoteContext } from "../../Providers/NoteProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'
import "./Note.css";

export const NoteDelete = () => {

    const { deleteNote } = useContext(NoteContext)
    const noteId = parseInt(useParams().id);
    const history = useHistory();
    console.log("noteId", noteId)

    const handleDeleteClick = () => {
        deleteNote(noteId)
            .then(() => {
                history.push(`/notes`)
            });
    }

    return (
        <>
            <h3>Are you sure you want to delete this note?</h3>

            <Button className="b" onClick={handleDeleteClick}>Yes</Button>
            <Button className="b" href="/notes">no</Button>
        </>
    )
}
export default NoteDelete;