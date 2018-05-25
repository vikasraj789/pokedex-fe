import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { logout, setMode } from "../modules/loginActions";
import { goTo } from "../globalActions";

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isAdmin: this.props.isAdmin,
            title: "Dashboard",
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isAdmin !== nextProps.isAdmin) {
            this.setState({
                isAdmin: nextProps.isAdmin,
            });
        }
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLogout = () => {
        this.handleClose();
        this.props.logout();
    };
    handleMode = () => {
        this.handleClose();
        const isAdmin = !this.state.isAdmin;
        this.props.setMode(isAdmin);
        if (!isAdmin) {
            this.props.logout();
        }
    };
    handleProfile = () => {
        this.handleClose();
        this.setState({
            title: `${this.props.user}(Profile)`,
        });
        this.props.goTo("/profile");
    };
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="title" color="inherit" className="flex">
                        {this.state.title}
                    </Typography>
                    <div>
                        <IconButton aria-owns={open ? "menu-appbar" : null} aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleMode}>{this.state.isAdmin ? "Normal Mode" : "Admin Mode"}</MenuItem>
                            {this.state.isAdmin ? <MenuItem onClick={this.handleProfile}>Profile</MenuItem> : ""}
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user.name,
    isAdmin: state.login.isAdmin,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            logout,
            setMode,
            goTo,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
