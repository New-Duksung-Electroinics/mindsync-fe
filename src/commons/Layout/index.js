// src/components/Layout.jsx
import React from "react";
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow p-4 bg-yellow-200">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
