// components/DefaultLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function DefaultLayout() {
  return (
    <>
      <NavBar />
      {/* Adding pt-20 to offset the fixed navbar */}
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}

export default DefaultLayout;
