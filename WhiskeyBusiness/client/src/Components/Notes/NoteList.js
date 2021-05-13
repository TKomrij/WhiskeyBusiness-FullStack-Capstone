import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../Providers/NoteProvider";
import Note from "./Note";

export const NoteList = () => {
    const { notes, getAllNotes } = useContext(NoteContext);
    const currentUser = JSON.parse(sessionStorage.getItem(`userProfile`))


    useEffect(() => {
        getAllNotes()
    }, []);

    useEffect(() => {
        console.log(notes)
    })
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
            <div className="">
                <h1>Tasting Notes</h1>
                <div className="">
                    {notes.filter(note => note.userProfileId === currentUser.id).map((note) => {

                        return <Note key={note.id} note={note} />
                    })}
                </div>
            </div>
        </div>
    );
};
export default NoteList;