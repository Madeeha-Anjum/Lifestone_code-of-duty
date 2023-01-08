import React from "react";
import { useSelector } from 'react-redux';

const TimelineScreen = () => {
    const { isAuth } = useSelector( state => state.auth );
    console.log("isAuth", isAuth);
    return(
        <>
            <h1>Timeline screen</h1>
        </>
    )
};

export default TimelineScreen;