/* eslint-disable no-unused-vars */
import { useContext } from "react";
import AuthContext from "./AuthContext";

function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
