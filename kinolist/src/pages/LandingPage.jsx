import React from "react";
import BackgroundLandingPage from "../assets/img/background_LandingPage.jpg";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div
      className="text-white bg-center	bg-cover w-screen h-screen bg-black relative"
      style={{
        backgroundImage: `url(${BackgroundLandingPage}),`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <Navbar />
    </div>
  );
}

export default LandingPage;
