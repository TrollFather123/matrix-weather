import { Box, styled } from "@mui/material";

export const WrapperStyle = styled(Box)`
    height: 100vh;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    /* flex-direction: column; */
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    &::after{
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.05);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
`