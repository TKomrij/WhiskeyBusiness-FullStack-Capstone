
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
import { TagContext } from "../../Providers/TagProvider";
import { WhiskeyContext } from "../../Providers/WhiskeyProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Note.css";

export const NoteForm = () => {

    const { addNote, editNote, getNoteById } = useContext(NoteContext);
    // const { tags, getTags } = useContext(TagContext);
    const { whiskey, getWhiskey, setWhiskey } = useContext(WhiskeyContext);
    const currentUser = JSON.parse(sessionStorage.getItem(`userProfile`))
    const { id } = useParams();

    const history = useHistory();
    const noteId = parseInt(useParams().id);

    const [note, setNote] = useState({
        userProfileId: currentUser.id,
        whiskeyId: `${id}`,
        description: "",
    });

    const saveNote = (e) => {
        e.preventDefault()
        // if (noteId) {
        //     editNote({
        //         id: note.id,
        //         userProfileId: currentUser.id,
        //         whiskeyId: `${note.whiskeyId}`,
        //         description: note.description,
        //     }).then(() => history.push(`/notes`));

        // } else {
        addNote({
            userProfileId: note.userProfileId,
            description: note.description,
            whiskeyId: note.whiskeyId,
        }).then(() => {
            history.push("/notes");
        });
        // }
        // }
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
        getWhiskey(id)
            .then((whiskeyObj) => {
                setWhiskey(whiskeyObj)
            });
    }, []);

    // useEffect(() => { console.log(whiskey) }, [whiskey])

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <h3 className="noteForm__title">
                            {/* {noteId ? <> Edit Post </> : <>New Note</>} */}
                            New Note for {whiskey.title}
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
                            {/* {noteId ? <> Save Changes </> : <>Add Note</>} */}
                            Add Note
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default NoteForm;