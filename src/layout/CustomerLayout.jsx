import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
