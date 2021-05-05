import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../Providers/NoteProvider";
import Note from "./Note";

export const NoteList = () => {
    const { notes, getAllNotes } = useContext(NoteContext);

    useEffect(() => {
        getAllNotes()
        console.log(notes)
    }, []);

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         searchPosts(searchTerms)
    //     } else {
    //         getPostsWithComments()
    //     }
    // }, [searchTerms])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {notes.map((note) => {

                        return <Note key={note.id} note={note} />
                    })}
                </div>
            </div>
        </div>
    );
};
export default NoteList;