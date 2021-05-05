import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NoteContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});
    const [searchTerms, setSearchTerms] = useState("");

    const getAllNotes = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken()
            .then((token) =>
                fetch("/api/note", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then((noteObj) => {
                setNotes(noteObj)
                console.log(noteObj)
            });
    };

    const getNote = (id) => {
        return getToken().then((token) =>
            fetch(`/api/note/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    };

    const addNote = (note) => {
        return getToken().then((token) =>
            fetch("/api/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(note),
            })
        );
    };


    // fetching filtered posts belonging to the current user

    const editNote = (note) => {
        return getToken()
            .then((token) =>
                fetch(`/api/note/${note.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(note),
                })
            )
    };

    const deleteNote = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/note/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(getAllNotes)
            )
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                getAllNotes,
                note,
                getNote,
                addNote,
                setSearchTerms,
                searchTerms,
                setNote,
                editNote,
                deleteNote
            }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};
export default PostProvider;