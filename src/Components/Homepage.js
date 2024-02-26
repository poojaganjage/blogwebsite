import React, {useEffect} from 'react';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import {useSelector, useDispatch} from "react-redux";
import {selectSignedIn, setSignedIn, setUserData} from '../features/userSlice';
import "../styling/Homepage.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);

  const clientId = '236587663210-d0svrdjb3eav70hjim1jqh1o5869kq8b.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });
  
  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  }

  // const failure = (response) => {
  //   console.log("Failure!!!");
  // }

  return (
    <div className="home__page" style={{display: isSignedIn ? "none": ""}}>
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📗</h2>
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin 
            clientId={clientId}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
              Login with Google
              </button>
            )}
            onSuccess={login}
            //onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ): (
        ""
      )}
    </div>
  );
}
export default Homepage;
