import React from "react";
import PokedexHolder from "../containers/pokedexHolder";

const Profile = props => (
    <div className="m-t-64">
        <PokedexHolder key="2" noFetch isProfile />
    </div>
);

export default Profile;
