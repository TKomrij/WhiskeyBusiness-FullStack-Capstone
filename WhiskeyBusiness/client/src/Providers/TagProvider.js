import React, { useState, useContext } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    }

    const getTagById = (tagId) => {
        return fetch(`/api/tag/${tagId}`)
            .then(res => res.json())
    }

    const addTag = (tag) => {
        return fetch("/api/tag", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(getTags);
    }

    const deleteTag = (tagId) => {
        return fetch(`/api/tag/${tagId}`, {
            method: "DELETE"
        })
            .then(getTags);
    }

    const editTag = (tag) => {
        return fetch(`/api/tag/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(getTags)
    }

    return (
        <TagContext.Provider value={{ tags, getTags, getTagById, addTag, deleteTag, editTag }}>
            {props.children}
        </TagContext.Provider>
    );
};
export default TagProvider;