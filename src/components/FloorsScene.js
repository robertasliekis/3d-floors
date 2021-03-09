import React, { useRef, useState, Suspense } from "react";
import { connect } from "react-redux";
import { setClickedFloor } from "../actions";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { softShadows } from "drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import FloorsModel from "./FloorsModel";

//"homepage": "http://https://robertasliekis.github.io/3d-floors/",

extend({ OrbitControls });

softShadows();

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} minDistance={150} />;
};

function FloorsScene({ clickedFloor, setClickedFloor }) {
  const clickedFloorChange = (index) => {
    setClickedFloor(index);
  };
  return (
    <div className="floor-model-container">
      <Canvas colorManagement shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
        <CameraControls />
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <group>
          <Suspense fallback={null}>
            <FloorsModel onClickedFloorChange={clickedFloorChange} clickedFloor={clickedFloor} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor
  };
};

const mapDispatchToProps = {
  setClickedFloor
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorsScene);
