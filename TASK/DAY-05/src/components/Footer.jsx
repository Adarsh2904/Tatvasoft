import React from "react";
import { addIcon } from "../assets/images";

function Footer(){
    return(
        <>
        <div className='footeralign'>
            { <img src={ addIcon } className='footerimg' alt="" /> }
        </div>
        </>
    )
}

export default Footer;