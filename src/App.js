import "./styles/App.scss";
import React from "react";
import { Route, Switch } from "react-router-dom";
import DashBoardPage from "./components/dashBoardPage";
import ProtectedRoute from "./containers/protectedRoute";
import LoginPage from "./components/loginPage";
import ProfilePage from "./components/profilePage";

const App = () => (
    <div className="h-100p">
        <main className="h-100p">
            <Switch>
                <ProtectedRoute exact path="/" component={DashBoardPage} />
                <ProtectedRoute exact path="/profile" component={ProfilePage} />
                <Route exact path="/login" component={LoginPage} />
            </Switch>
        </main>
    </div>
);

export default App;
