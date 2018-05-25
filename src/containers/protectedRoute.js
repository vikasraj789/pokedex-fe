import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./header";

class ProtectedRoute extends Route {
    render() {
        const { component: Component, loggedIn, ...rest } = this.props;
        if (loggedIn) {
            return [<Header key="header" />, <Component key="component" props={rest} />];
        }
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location },
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
