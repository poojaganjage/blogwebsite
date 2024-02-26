import React, {useState} from 'react';
import {Avatar} from "@mui/material";
import {GoogleLogout} from 'react-google-login';
import {useSelector, useDispatch} from "react-redux";
import {selectSignedIn, selectUserData, setSignedIn, setUserData, setSearchInput} from "../features/userSlice";
import "../styling/Navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const clientId = '236587663210-d0svrdjb3eav70hjim1jqh1o5869kq8b.apps.googleusercontent.com';

  const dispatch = useDispatch();
  const logout = (response) => {
    console.log(response);
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  }

  return (
    <div className='navbar'>
        <h1 className='navbar__header'>BlogMania 💬</h1>
        {isSignedIn && (
            <div className="blog__search">
                <input 
                    className='search'
                    placeholder='Seach for a blog'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className='submit' onClick={handleClick}>Search</button>
            </div>
        )}

        {isSignedIn ? (
            <div className='navbar__user__data'>
                <Avatar 
                    className='user'
                    src={userData?.imageUrl}
                    alt={userData?.name}
                />
                <h1 className='signedIn'>{userData?.givenName}</h1>
                <GoogleLogout 
                    clientId={clientId}
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="logout__button"
                        >
                        Logout 😦
                        </button>
                    )}
                    onLogoutSuccess={logout}
                />
            </div>
        ): (
            <h1 className='notSignedIn'>User not available 😞</h1>
        )}
    </div>
  );
}
export default Navbar;
