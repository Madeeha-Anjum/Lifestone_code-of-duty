import React from "react";
import styled from '@emotion/styled'
import Animation from '../components/Animation';

const HomeScreen = () => {
    return (
    <StyledContainer>
        <Animation />
    </StyledContainer>);
}

const StyledContainer = styled('div')`
    background-color: #121212;
`;

export default HomeScreen;