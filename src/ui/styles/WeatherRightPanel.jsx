import { Box, styled } from "@mui/material";

export const WeatherRightPanel = styled(Box)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  width: 400px;
  height: 100vh;
  padding: 50px;
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.07);
  .weather_details {
    text-align: left;
    h5{
        margin-top: 50px;
    }
    ul{
        li{
            padding-left: 0;
            justify-content: space-between;
            .MuiStack-root{
                i{
                    display: inline-block;
                    margin-left: 10px;
                }
            }
        }
    }
  }
  
`;

export const WeatherLeftPanel = styled(Box)`
  max-width: calc(100% - 730px);
  width: 50%;
  padding: 20px;
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.07);
  position: relative;
  z-index: 9;
  .sub_panel {
    text-align: left;
  }
`;
