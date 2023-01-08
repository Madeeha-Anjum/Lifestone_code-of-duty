import React from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
} from "reactstrap";
import WalletIcon from "@mui/icons-material/Wallet";
import shortLogoWithText from "../images/shortLogoWithText.png";
const Header = () => {
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
        >
          <div className="text-white">
            Connect to wallet &nbsp;
            <WalletIcon />
          </div>
        </Button>
      </Navbar>
      <hr/>
    </div>
  );
};

export default Header;