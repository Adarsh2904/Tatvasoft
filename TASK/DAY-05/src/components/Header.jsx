import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import { addIcon } from "../assets/images";
import { Button } from "@mui/material";

function Header() {
    return (
        <>
            <div className="headeraligntop">
                {<img src={addIcon} className='headerimg' alt="" />}
                <Link to='/login' className="link">Login</Link> {' '}

                <Link to='/register' className="link">Register</Link> {' '}
                <Button variant="outlined" href="/cart">Cart</Button>
            </div>
            <div className="headeralignbottom">
                <div className="items">
                    <Searchbar />
                    <Button variant="contained" style={{ backgroundColor: "#80bf32" }}>Search</Button>
                    <Button variant="contained">Cancel</Button>
                </div>
            </div>
        </>
    )
}

export default Header;