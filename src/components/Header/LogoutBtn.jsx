import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    {/*  Why: Our authService.logout() uses async/await and returns the promise from Appwrite's deleteSessions().
             Using .then() is the exact right way to execute code after that asynchronous operation finishes.        */}
    authService.logout().then(() => {  // .then because returns a promise, to handle it we use .then
      dispatch(logout());   // To update the logout information in the store
      {/* Why: Calling dispatch(logout()) clears the state in our Redux store (setting status to false and userData to null).
        This instantly triggers React to update our UI (e.g., hiding the logout button and showing login/signup links).  */}
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounder-full" onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn;
