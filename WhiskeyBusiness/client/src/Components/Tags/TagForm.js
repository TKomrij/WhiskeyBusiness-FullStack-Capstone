import React, { useContext, useState, useEffect } from "react";
import { TagContext } from "../../Providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, Label, Input } from 'reactstrap'
import Tag from "./Tag"
import "./Tags.css";


export const TagForm = () => {
    const { tags, addTag, getTags } = useContext(TagContext);

    const [tag, setTags] = useState({
        Name: ""
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag };
        let selectedVal = event.target.value;
        //The event.target.id is "name" (the form Input Id)
        newTag[event.target.id] = selectedVal
        setTags(newTag);
    }

    const handleClickSaveTag = (event) => {
        event.preventDefault();
        if (tag.Name === "") {
            window.alert("Please provide a title for the tag you are trying to create.");
        } else {
            addTag(tag)
                .then(() => history.push("/tagForm"));
        }
    }

    useEffect(() => {
        getTags()
    }, []);

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
                </Form>
                <h3>Already Created Tags</h3>
                <div>
                    {tags.map((tag) => {
                        return <Tag key={tag.id} tag={tag} />
                    })}
                </div>
            </div>
        </>
    )
}
export default TagForm;