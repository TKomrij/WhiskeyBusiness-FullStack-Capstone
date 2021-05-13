import React, { useState, useContext } from "react";
import { UserProfileContext } from "../Providers/UserProfileProvider";

export const TagNoteContext = React.createContext();


export const TagNoteProvider = (props) => {
    const [tagNotes, setTagNotes] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    // const getTagNotes = () => {
    //     return getToken()
    //         .then((token) =>
    //             fetch("/api/tagNote", {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }).then((res) => res.json())
    //         )
    //         .then(setTagNotes)
    // }


    const addTagNote = (tagNote) => {
        return getToken()
            .then((token) =>
                fetch(`/api/tagNote`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(tagNote)
                })
            )
    }

    return (
        <TagNoteContext.Provider value={{ tagNotes, addTagNote }}>
            {props.children}
        </TagNoteContext.Provider>
    );
};
export default TagNoteProvider;