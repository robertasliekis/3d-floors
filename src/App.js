import React from "react";
import FloorsScene from "./components/FloorsScene";
import InfoWindow from "./components/InfoWindow";

//"homepage": "http://https://robertasliekis.github.io/3d-floors/",

function App() {
  return (
    <div className="website-wrapper">
      <FloorsScene />
      <InfoWindow />
    </div>
  );
}

export default App;
