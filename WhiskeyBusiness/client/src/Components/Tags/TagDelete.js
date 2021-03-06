import React, { useContext } from "react";
import { TagContext } from "../../Providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from 'reactstrap'
import "./Tags.css";

export const TagDelete = () => {
    const { deleteTag } = useContext(TagContext);
    const tagId = useParams().id;
    const history = useHistory();

    const handleDelete = () => {
        deleteTag(tagId)
            .then(() => {
                history.push('/tagForm')
            });
    }

    return (
        <>
            <h2>Are you sure you want to delete this tag?</h2>
            <Button className="a" onClick={handleDelete}>Delete</Button>
            <Button className="a" href="/tagForm">Go Back</Button>
        </>
    )

}
export default TagDelete;