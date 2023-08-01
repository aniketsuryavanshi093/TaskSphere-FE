/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import AuthContext from "./AuthContext";

const UserAuthState = ({ children }) => {
  const [progress, setprogress] = useState("");
  const [isnextAllowed, setisnextAllowed] = useState(false);
  const [trigger, settrigger] = useState("");

  const handlenext = (step) => {
    settrigger(step);
  };
  const State = {
    progress,
    setprogress,
    setisnextAllowed,
    isnextAllowed,
    trigger,
    settrigger,
    handlenext,
  };
  return <AuthContext.Provider value={State}>{children}</AuthContext.Provider>;
};
export default UserAuthState;
