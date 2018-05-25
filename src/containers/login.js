import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { goTo } from "../globalActions";
import { login } from "../modules/loginActions";
import SocialButton from "../components/socialButton";

const Login = props => {
    const handleSocialLogin = user => {
        //TODO: could be batched. But fased an issue with the type of react-router-redux push action
        localStorage.setItem("userToken", user._token.accessToken);
        const profile = user._profile;
        props.login({
            id: profile.id,
            name: profile.name,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
        });
        props.goTo("/");
    };

    const handleSocialLoginFailure = err => {
        console.error(err);
    };
    return (
        <div>
            <SocialButton provider="facebook" appId="414917728896148" onLoginSuccess={handleSocialLogin} onLoginFailure={handleSocialLoginFailure} />
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            goTo,
            login,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(Login);
