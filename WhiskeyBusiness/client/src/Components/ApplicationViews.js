import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../Providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import Hello from "./Hello";
import WhiskeyProvider from "../Providers/WhiskeyProvider";
import WhiskeyList from "./Whiskies/WhiskeyList";
import WhiskeyDetails from "./Whiskies/WhiskeyDetails";


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