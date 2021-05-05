
import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { NoteContext } from "../../Providers/NoteProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Note.css";

export const NoteForm = () => {

    const { addNote, editNote, getNote } = useContext(NoteContext);
    const currentUser = parseInt(localStorage.getItem("userProfile"))

    const history = useHistory();
    const noteId = parseInt(useParams().id);

    const [note, setNote] = useState({
        id: "",
        userProfileId: currentUser,
        whiskeyId: 0,
        description: "",
    });

    const savePost = (e) => {
        e.preventDefault();
        if (noteId) {
            editNote({
                id: note.id,
                userProfileId: currentUser,
                whiskeyId: note.whiskeyId,
                description: note.description,
            }).then(() => history.push(`/note/${noteId}`));

        } else {
            addNote({
                userProfileId: parseInt(note.userProfileId),
                descrition: post.description,
                whiskeyId: parseInt(note.whiskeyId),
            }).then(() => {
                history.push("/note");
            });
        }
    };


    const handleInputChange = (event) => {

        const newNote = { ...note }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newNote[event.target.id] = selectedVal
        setNote(newNote)
    }


    useEffect(() => {
        if (noteId) {
            getNote(noteId).then((note) => {
                setNote(note);
            });
        }
    }, []);

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <h3 className="noteForm__title">
                            {noteId ? <> Edit Post </> : <>New Post</>}
                        </h3>
                        <Form>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <br />
                                <Input
                                    type="textarea"
                                    value={note.description}
                                    rows="10"
                                    id="description"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            {/* <FormGroup>
                                <Input
                                    type="select"
                                    value={post.categoryId}
                                    name="categoryId"
                                    id="categoryId"
                                    onChange={handleInputChange}
                                >
                                    <option value="0">Select a Category</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup> */}
                        </Form>
                        <Button color="info" onClick={saveNote}>
                            {noteId ? <> Save Changes </> : <>Add Note</>}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default NoteForm;