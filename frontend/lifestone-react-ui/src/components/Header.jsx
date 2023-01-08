import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import WalletIcon from "@mui/icons-material/Wallet";
import shortLogoWithText from "../images/shortLogoWithText.png";
import { updateLoginState } from '../actions/AuthActions';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'
import jazzicon from "@metamask/jazzicon"
import { Avatar } from '@mui/material';
import { addUserToDb } from "../Api";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuth } = useSelector( state => state.auth );

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null
      })
    
      const [account, setAccount] = useState(null);

      const avatarRef = useRef()
      useEffect(() => {
            const element = avatarRef.current;
            if (element && account) {
                const addr = account.slice(2, 10);
                const seed = parseInt(addr, 16);
                const icon = jazzicon(30, seed); //generates a size 20 icon
                if (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                element.appendChild(icon);
            }
        }, [account, avatarRef]);

    
      useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
    
          if (provider) {
            setWeb3Api({ 
              web3: new Web3(provider),
              provider
            });
          } else {
            console.error("Please install MetaMask!");
          }
        };
        loadProvider();
      }, []);
    
      useEffect(() => {
        const getAccount = async () => {
          const accounts = await web3Api.web3.eth.getAccounts();
          setAccount(accounts[0]);
        }
        web3Api.web3 && getAccount();
      }, [web3Api.web3]);


  return (
    <div>
      <Navbar light className="d-flex align-items-center">
        <NavbarBrand href="/" style={{ color: "white" }} alt="Logo">
          <img src={shortLogoWithText} style={{ height: "90px" }} alt="Our beautiful logo"/>
        </NavbarBrand>
        {!isAuth ? <Button
          color="pink-600"
          className=""
          style={{ backgroundColor: "#de3576" }}
          onClick={async () => {
            await web3Api.provider.request({'method': "eth_requestAccounts"});
            const userToAdd = {
                "wallet_id": account,
                "username": "user",
                "friend_requests": "",
                "friends": ""
            }
            await addUserToDb(userToAdd);
            dispatch(updateLoginState( true ));
            navigate('/timeline');
            window.location.reload();
          }}
        >
          <div className="text-white">
            Connect to wallet &nbsp;
            <WalletIcon />
          </div>
        </Button> : null}
        {isAuth ? <Button
          color="pink-600"
          style={{ backgroundColor: "#de3576" }}
          onClick={() => {
            dispatch(updateLoginState( false ));
            navigate('/');
          }}
        >
            Log out
        </Button> : null}
        {isAuth ? <Avatar sx={{ bgcolor: "#86dc3d" }} ref={avatarRef} /> : null}
      </Navbar>
    </div>
  );
};

export default Header;