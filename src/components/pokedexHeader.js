import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Select from "react-select";

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

const PokedexHeader = props => {
    const handleChange = e => {
        props.setPagination(e.target.value);
    };
    const handleName = name => {
        props.searchName(name);
    };
    const handleType = type => {
        props.searchType(type);
    };
    const SelectWrapped = props => {
        const { classes, ...other } = props;

        return (
            <Select
                optionComponent={Option}
                noResultsText={<Typography>{"No results found"}</Typography>}
                arrowRenderer={arrowProps => {
                    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
                }}
                clearRenderer={() => <ClearIcon />}
                valueComponent={valueProps => {
                    const { value, children, onRemove } = valueProps;

                    const onDelete = event => {
                        event.preventDefault();
                        event.stopPropagation();
                        onRemove(value);
                    };

                    if (onRemove) {
                        return <Chip tabIndex={-1} label={children} deleteIcon={<CancelIcon onTouchEnd={onDelete} />} onDelete={onDelete} />;
                    }

                    return <div className="Select-value">{children}</div>;
                }}
                {...other}
            />
        );
    };
    return (
        <div className="p-t-b-20 p-l-r-30 header">
            <TextField
                id="number"
                label="Paginate"
                value={props.limit}
                onChange={handleChange}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="none"
            />
            <Input
                inputComponent={SelectWrapped}
                value={props.type}
                onChange={handleType}
                placeholder="Categorize by type"
                id="react-select-single"
                className="type-holder"
                inputProps={{
                    name: "react-select-single",
                    instanceId: "react-select-single",
                    simpleValue: true,
                    options: props.typeSuggestions,
                }}
            />
            <TextField
                value={props.name}
                onChange={handleName}
                placeholder="Search by name"
                name="react-select-chip-label"
                InputLabelProps={{
                    shrink: true,
                }}
                className="name-holder"
                InputProps={{
                    inputComponent: SelectWrapped,
                    inputProps: {
                        multi: true,
                        instanceId: "react-select-chip-label",
                        id: "react-select-chip-label",
                        simpleValue: true,
                        options: props.nameSuggestions,
                        className: "name-holder",
                    },
                }}
            />
        </div>
    );
};

export default PokedexHeader;
