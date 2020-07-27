import React, { useState, useEffect } from "react";
import { signIn, signOut } from "../../actions";
import { connect } from "react-redux";

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  const [auth, setAuth] = useState(null);

  const onAuthChange = localAuth => {
    let isSignedIn = localAuth.isSignedIn.get();
    let userId = localAuth.currentUser.get().getId();
    if (isSignedIn) {
      signIn(userId);
    } else {
      signOut();
    }
  };

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      let localAuth = null;
      window.gapi.client
        .init({
          clientId:
            process.env.GOOGLE_CLIENT_ID,
          scope: "email"
        })
        .then(() => {
          localAuth = window.gapi.auth2.getAuthInstance();
          setAuth(localAuth);
          onAuthChange(localAuth);
          localAuth.isSignedIn.listen(() => onAuthChange(localAuth));
        });
    });
  }, []);

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn === true) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button onClick={onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
