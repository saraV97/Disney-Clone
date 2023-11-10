import styled from "styled-components";
import { auth, provider } from "../firebase";
import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/users/userSlice";
import React, { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);
  // const auth = getAuth();
  // const provider = new GoogleAuthProvider();

  const handlerAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          history("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history("/home");
      }
    });
  }, [userName]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handlerAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>Home</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>Search</span>
            </a>
            <a href="/movie">
              <img src="/images/movie-icon.svg" alt="MOVIE" />
              <span>Movie</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>Series</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>Watchlist</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown onClick={handlerAuth}>Sign Out</DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  padding: 0px;
  margin: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    padding: 0 12px;
    align-items: center;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      line-height: 1;

      letter-spacing: 1.42px;
      padding: 2px 0px;
      white-spacing: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 30;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &: hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const Login = styled.a`
  background-color: rgb(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid white;
  transition: all 0.2s ease-out 0s;

  &: hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparentf;
  }
`;
const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  letter-spacing: 1.42px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50% 50%;
    weight: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-timing: 1s;
    }
  }
`;
export default Header;
