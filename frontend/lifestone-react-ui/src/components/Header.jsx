import React from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import WalletIcon from "@mui/icons-material/Wallet";
import shortLogoWithText from "../images/shortLogoWithText.png";
import { updateLoginState } from '../actions/AuthActions';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <div>
      <Navbar light className="d-flex align-items-center">
        <NavbarBrand href="/" style={{ color: "white" }} alt="Logo">
          <img src={shortLogoWithText} style={{ height: "60px" }} alt="Our beautiful logo"/>
        </NavbarBrand>
        <Button
          color="pink-600"
          className=""
          style={{ backgroundColor: "#de3576" }}
          onClick={() => {
            dispatch(updateLoginState( true ));
            navigate('/timeline');
            window.location.reload();
          }}
        >
          <div className="text-white">
            Connect to wallet &nbsp;
            <WalletIcon />
          </div>
        </Button>
        <Button
          color="pink-600"
          style={{ backgroundColor: "#de3576" }}
          onClick={() => {
            dispatch(updateLoginState( false ));
            navigate('/');
            window.location.reload();
          }}
        >
            Log out
        </Button>
      </Navbar>
      <hr/>
    </div>
  );
};

export default Header;