import axios from "axios";

const _getRequestConfig = function() {
    let config = {};
    let userToken = localStorage.getItem("userToken") || null;

    config["headers"] = {};
    config["headers"]["Content-Type"] = "application/json";
    config["headers"]["Authorization"] = userToken;

    return config;
};

export const authenticatedGet = (url, config) => {
    if (!url) {
        return;
    }

    if (!config) {
        config = _getRequestConfig();
    }

    return axios.get(url, config);
};

export const authenticatedPost = (url, data, config) => {
    if (!url) {
        return;
    }

    if (!config) {
        config = _getRequestConfig();
    }

    return axios.post(url, data, config);
};

export const authenticatedPut = (url, data, config) => {
    if (!url) {
        return;
    }

    if (!config) {
        config = _getRequestConfig();
    }

    return axios.put(url, data, config);
};

export const getNames = list => {
    return list.map(poke => {
        return {
            value: poke.name,
            label: poke.name,
        };
    });
};

export const getTypes = list => {
    const dupTypes = [];
    list.forEach(poke => {
        if (poke.types.length) {
            dupTypes.push(...poke.types);
        }
    });
    //To remove duplicates in an array using Set
    const types = [...new Set(dupTypes.map(type => type))].map(type => {
        return {
            value: type,
            label: type,
        };
    });
    return types;
};
