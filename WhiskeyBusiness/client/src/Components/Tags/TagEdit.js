import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../Providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Label, Input } from 'reactstrap'
import "./Tags.css";

export const TagEdit = () => {

    const { getTagById, editTag } = useContext(TagContext);
    const history = useHistory();
    const tagId = useParams().id;

    const [tag, setTag] = useState({
        Name: "",
        Id: tagId
    });


    useEffect(() => {
        getTagById(tagId)
            .then(tag => {
                setTag(tag)
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag };
        let selectedVal = event.target.value;
        //The event.target.id is "name" (the form Input Id)
        newTag[event.target.id] = selectedVal
        setTag(newTag);
    }

    const handleClickSaveTag = (event) => {
        event.preventDefault();
        if (tag.Name === "") {
            window.alert("Please provide a title for the tag you are trying to create.");
        } else {
            editTag(tag)
                .then(() => history.push("/tagForm"));
        }
    }

    return (
        <>
            <div>
                <Form className="addTagDiv" onSubmit={handleClickSaveTag}>
                    <Label for="tagInput">New Tag Name</Label>
                    <Input id="Name"
                        placeholder="Enter Tag Name"
                        type="text"
                        onChange={handleControlledInputChange}></Input>
                    <Button className="a">Save</Button>
                    <Button className="a" href="/tagForm">Go Back</Button>
                </Form>
            </div>
        </>
    )
}
export default TagEdit;