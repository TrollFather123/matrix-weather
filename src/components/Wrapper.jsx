import React from 'react'
import { WrapperStyle } from '../ui/styles/WrapperStyle'
import BgImage from '../assets/images/weather_bg_img.jpg'



const Wrapper = ({children}) => {
  return (
    <WrapperStyle sx={{backgroundImage:`url(${BgImage})`}}>
        {children}
    </WrapperStyle>
  )
}

export default Wrapper