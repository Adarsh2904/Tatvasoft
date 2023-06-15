import { Button, Divider } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import logo from "../assets/logo.jpg";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../State/Slice/cartSlice";
import { signOut } from "../State/Slice/authSlice";
import shared from "../utils/shared";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const authData = useSelector((state) => state.auth.user);

  const logOut = () => {
    // authContext.signOut();
    dispatch(signOut());
  };

  useEffect(() => {
    const userId = authData.id;

    if (userId && cartData.length === 0) {
      dispatch(fetchCartData(userId));
    }
  }, [authData.id, cartData.length, dispatch]);

  const items = useMemo(() => {
    return shared.NavigationItems.filter(
      (item) => !item.access.length || item.access.includes(authData.roleId)
    );
  }, [authData]);

  return (
    <>
      <div className="flex justify-between items-center bg-white border-t-8 border-[#f14d54]">
        <img src={logo} alt="TatvaSoft_Logo" className="h-24 ml-40 w-44" />

        <div className="mr-40  space-x-1 flex">
          {!authData.id && (
            <>
              <Button
                variant="text"
                sx={{
                  color: "#f14d54",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ backgroundColor: "#f14d54" }}
              />
              <Button
                variant="text"
                sx={{ color: "#f14d54", textTransform: "capitalize" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </>
          )}
          {items.map((item, index) => (
            <div key={`${item.name}-${item.route}-${index}`} className="flex">
              <Button
                variant="text"
                sx={{
                  color: "#f14d54",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate(item.route);
                }}
              >
                {item.name}
              </Button>
              {index !== items.length - 1 && (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ backgroundColor: "#f14d54" }}
                />
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            sx={{
              color: "#f14d54",
              borderColor: "#f14d54",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            startIcon={<HiShoppingCart />}
            onClick={() => {
              navigate("/cart-page");
            }}
          >
            {cartData.length}
            <span
              style={{
                color: "black",
                marginLeft: "4px",
                fontWeight: "normal",
              }}
            >
              cart
            </span>
          </Button>
          {!!authData.id ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f14d54",
                "&:hover": {
                  backgroundColor: "#f14d54", // Change the hover background color
                },
                textTransform: "capitalize",
              }}
              onClick={() => {
                logOut();
              }}
            >
              LogOut
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
