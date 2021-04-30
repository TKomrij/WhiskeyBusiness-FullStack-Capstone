import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import Hello from "./Hello";
import PostProvider from "../providers/PostProvider";
import PostList from "./Posts/PostList"
import MyPostList from "./Posts/MyPostList";
import PostDetails from "./Posts/PostDetails";
import PostForm from "./Posts/PostForm";
import CategoryList from "./Category/CategoryList";
import CategoryProvider from "../providers/CategoryProvider";
import CategoryForm from "./Category/CategoryForm";
import DeleteCategory from "./Category/DeleteCatForm";
import CategoryEditForm from "./Category/CategoryEditForm";
import TagProvider from "../providers/TagProvider";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm.js"
import TagDelete from "./Tags/TagDelete";
import TagEdit from "./Tags/TagEdit";
import UserProfileList from "./Users/UserProfileList";
import UserProfileDetails from "./Users/UserProfileDetails"
import CommentProvider from "../providers/CommentProvider"
import CommentList from "./Comment/CommentList"
import CommentForm from "./Comment/CommentForm"
import DeactivateUserProfile from "./Users/UserDeactivateForm";
import PostDelete from "./Posts/PostDelete";
import "./appViews.css"


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

            </Switch>
        </main>
    );
};