import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// if user didn't send authentication then by default it's concidered true
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // authentication = true by default and authStatus if false and not equals to authentication, there for (true && true) then navigates to login page
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    // authectication = true by default, so !authentication = not true, that is false
    // and if authStatus is true, authentication is true, and both equal instead of not equal,therefore false
    // now (false && false) will make if condition to fail
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
