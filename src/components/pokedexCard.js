import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { putData } from "../globalActions";
import APP_CONSTANTS from "../constants";

class PokedexCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: this.props.item.isFav,
        };
    }
    handleClick = e => {
        const url = this.state.isFavourite
            ? `${APP_CONSTANTS.beUrl}unFavourite/${this.props.userId}`
            : `${APP_CONSTANTS.beUrl}favourite/${this.props.userId}`;
        this.setState({
            isFavourite: !this.state.isFavourite,
        });
        this.props.putData({
            url,
            data: {
                name: e.currentTarget.dataset.name,
            },
        });
    };
    render() {
        const { item } = this.props;
        return (
            <Card className="card m-b-20">
                <CardMedia className="media" image={item.avatar} title={item.name} />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {item.name}
                    </Typography>
                    <Typography component="p" noWrap>
                        {item.types.map((type, i) => {
                            return i === item.types.length - 1 ? type : `${type}, `;
                        })}
                    </Typography>
                </CardContent>
                <CardActions>
                    {this.props.isProfile ? (
                        <StarIcon color="primary" />
                    ) : (
                        <Button size="small" color="primary" data-name={item.name} onClick={this.handleClick}>
                            {this.state.isFavourite ? "UnFavourite" : "Favourite"}
                        </Button>
                    )}
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.login.user.id,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            putData,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PokedexCard);
