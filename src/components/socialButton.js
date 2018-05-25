import React from "react";
import SocialLogin from "react-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const FBbutton = ({ children, triggerLogin, ...props }) => <FacebookLoginButton onClick={triggerLogin} {...props} />;

export default SocialLogin(FBbutton);
