import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../Providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import Hello from "./Hello";
import WhiskeyProvider from "../Providers/WhiskeyProvider";
import WhiskeyList from "./Whiskies/WhiskeyList";
import WhiskeyDetails from "./Whiskies/WhiskeyDetails";
import NoteProvider from "../Providers/NoteProvider";
import NoteList from "./Notes/NoteList";
import NoteForm from "./Notes/NoteForm";
import NoteDelete from "./Notes/NoteDelete";
import NoteEdit from "./Notes/NoteEdit";
import TagProvider from "../Providers/TagProvider";
import TagForm from "../Components/Tags/TagForm";
import TagDelete from "../Components/Tags/TagDelete";
import TagEdit from "../Components/Tags/TagEdit";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    {isLoggedIn ? < Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/whiskey" exact>
                    <WhiskeyProvider>
                        {isLoggedIn ? <WhiskeyList /> : <Redirect to="/login" />}
                    </WhiskeyProvider>
                </Route>

                <Route path="/whiskey/:id(\d+)" exact>
                    <WhiskeyProvider>
                        {isLoggedIn ? <WhiskeyDetails /> : <Redirect to="/login" />}
                    </WhiskeyProvider>
                </Route>

                <Route path="/notes" exact>
                    <NoteProvider>
                        {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                    </NoteProvider>
                </Route>

                <Route path="/noteForm/:id(\d+)" exact>
                    <NoteProvider>
                        {isLoggedIn ? <NoteForm /> : <Redirect to="/login" />}
                    </NoteProvider>
                </Route>

                <Route path="/note/delete/:id(\d+)" exact>
                    <NoteProvider>
                        {isLoggedIn ? <NoteDelete /> : <Redirect to="/login" />}
                    </NoteProvider>
                </Route>

                <Route path="/note/edit/:id(\d+)" exact>
                    <NoteProvider>
                        {isLoggedIn ? <NoteEdit /> : <Redirect to="/login" />}
                    </NoteProvider>
                </Route>

                <Route path="/tagForm/" exact>
                    <TagProvider>
                        {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
                    </TagProvider>
                </Route>

                <Route path="/tag/edit/:id(\d+)" exact>
                    <TagProvider>
                        {isLoggedIn ? <TagEdit /> : <Redirect to="/login" />}
                    </TagProvider>
                </Route>

                <Route path="/tag/delete/:id(\d+)" exact>
                    <TagProvider>
                        <TagDelete />
                    </TagProvider>
                </Route>


                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

            </Switch>
        </main >
    );
};