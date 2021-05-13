import React, { useState, useContext } from "react";
import { UserProfileContext } from "../Providers/UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getTags = () => {
        return getToken()
            .then((token) =>
                fetch("/api/tag", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then(setTags);
    }

    const getTagById = (tagId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/tag/${tagId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(res => res.json())
            )
    }

    const getTagsByNoteId = (noteId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/Tag/noteTags/${noteId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(res => res.json())
            )
    }

    const addTag = (tag) => {
        return getToken()
            .then((token) =>
                fetch("/api/tag", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(tag)
                })
            )
            .then(getTags)
    }

    const deleteTag = (tagId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/tag/${tagId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(getTags)
            )
    }

    const editTag = (tag) => {
        return getToken()
            .then((token) =>
                fetch(`/api/tag/${tag.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(tag)
                })
                    .then(getTags)
            )
    }

    return (
        <TagContext.Provider value={{ tags, getTags, addTag, deleteTag, editTag, getTagsByNoteId, getTagById }}>
            {props.children}
        </TagContext.Provider>
    );
};
export default TagProvider;