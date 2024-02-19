import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = "true" /*default*/ }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authSlice.status);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate, authStatus, authentication]);
  return isLoading ? <h1>Loading....</h1> : <>{children}</>;
};

export default Protected;
