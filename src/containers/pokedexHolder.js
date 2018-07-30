import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "../globalActions";
import APP_CONSTANTS from "../constants";
import PokedexCard from "../components/pokedexCard";
import PokedexHeader from "../components/pokedexHeader";
import { getNames, getTypes } from "../utils";

class PokedexHolder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            names: [],
            types: [],
            params: {
                limit: 20,
                offset: 1,
            },
            paginate: 20,
            name: "",
            type: "",
        };
    }
    componentDidMount() {
        if (this.props.noFetch) {
            const items = this.props.pokemons.list.filter(item => item.isFav);
            const names = getNames(items);
            const types = getTypes(items);
            this.setState({
                items: items,
                names: names,
                types: types,
            });
        } else {
            this.props.fetchData({
                url: APP_CONSTANTS.beUrl,
                data: {
                    userId: this.props.userId,
                    params: this.state.params,
                },
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.pokemons.list !== nextProps.pokemons.list) {
            this.setState({
                items: nextProps.pokemons.list,
            });
        }
        if (this.props.pokemons.names !== nextProps.pokemons.names) {
            this.setState({
                names: nextProps.pokemons.names,
            });
        }
        if (this.props.pokemons.types !== nextProps.pokemons.types) {
            this.setState({
                types: nextProps.pokemons.types,
            });
        }
    }
    fetchData = () => {
        if (this.state.paginate) {
            const state = { ...this.state };
            const { params, paginate } = state;
            params.offset = Math.abs(params.limit + params.offset + 1);
            params.limit = paginate;
            this.props.fetchData({
                url: APP_CONSTANTS.beUrl,
                data: {
                    params: params,
                },
            });
            this.setState({
                params,
            });
        }
    };
    setPagination = limit => {
        const paginate = Number(limit);
        this.setState({
            paginate: paginate ? Math.abs(paginate) : 20,
        });
    };
    searchName = name => {
        let list = this.props.pokemons.list;
        if (this.state.type) {
            list = list.filter(item => item.types.indexOf(this.state.type) > -1);
        }
        let data = list;
        if (name) {
            const items = list.filter(item => name.indexOf(item.name) > -1);
            data = items;
        }
        this.setState({
            name,
            items: data,
        });
    };
    searchType = type => {
        let list = this.props.pokemons.list;
        let data = list;
        if (this.state.name) {
            list = this.state.items;
            data = list;
        }
        if (type) {
            const items = list.filter(item => item.types.indexOf(type) > -1);
            data = items;
        }
        this.setState({
            type,
            items: data,
        });
    };
    render() {
        const { items } = this.state;
        return (
            <div className="pokedex-holder">
                {this.props.pokemons.list.length > 0 && (
                    <PokedexHeader
                        limit={this.state.paginate}
                        setPagination={this.setPagination}
                        typeSuggestions={this.state.types}
                        type={this.state.type}
                        searchType={this.searchType}
                        nameSuggestions={this.state.names}
                        name={this.state.name}
                        searchName={this.searchName}
                    />
                )}
                {this.props.pokemons.list.length ? (
                    this.state.items.length ? (
                        <InfiniteScroll
                            id="scroll"
                            dataLength={items.length}
                            next={this.fetchData}
                            hasMore={!this.props.noFetch && !this.state.type && !this.state.name}
                            loader={<h4 className="loading">Loading...</h4>}
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-around",
                                paddingLeft: 40,
                                paddingRight: 40,
                                paddingTop: 100,
                            }}
                        >
                            {this.state.items.map(item => {
                                return <PokedexCard item={item} key={item.name} isProfile={this.props.isProfile} />;
                            })}
                        </InfiniteScroll>
                    ) : (
                        <div className="p-20">No pokemons found for the above filters</div>
                    )
                ) : (
                    <div className="p-20">Fetching data...</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons,
    userId: state.login.user.id,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchData,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PokedexHolder);
