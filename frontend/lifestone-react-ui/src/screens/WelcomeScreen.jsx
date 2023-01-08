import React from "react";
import styled from '@emotion/styled'
import Animation from '../components/Animation';
import { useSelector } from 'react-redux';

const WelcomeScreen = () => {
    const { isAuth } = useSelector( state => state.auth );
    console.log("Is auth: ", isAuth)
    return (
    <StyledContainer>
        <Animation />
    </StyledContainer>);
}

const StyledContainer = styled('div')`
    background-color: #121212;
`;

export default WelcomeScreen;