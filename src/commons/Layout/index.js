// src/components/Layout.jsx
import React from "react";
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
