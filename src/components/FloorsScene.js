import React, { useRef, useState, Suspense } from "react";
import { connect } from "react-redux";
import { setClickedFloor, setClickedRoom } from "../actions";
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

function FloorsScene({ clickedFloor, clickedRoom, clickCount, setClickedFloor, setClickedRoom }) {
  const clickedFloorChange = (index) => {
    setClickedFloor(index);
  };
  const clickedRoomChange = (index) => {
    setClickedRoom(index);
  };
  return (
    <div className="floor-model-container">
      <Canvas colorManagement shadowMap camera={{ position: [10, 15, -20], fov: 60 }}>
        <CameraControls />
        <ambientLight intensity={0.6} />
        <pointLight position={[-10, 100, -20]} intensity={0.5} />
        <group>
          <Suspense fallback={null}>
            <FloorsModel
              onClickedFloorChange={clickedFloorChange}
              onClickedRoomChange={clickedRoomChange}
              clickedFloor={clickedFloor}
              clickedRoom={clickedRoom}
              clickCount={clickCount}
            />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor,
    clickedRoom: state.setClickedRoom.clickedRoom,
    clickCount: state.setClickedFloor.clickCount
  };
};

const mapDispatchToProps = {
  setClickedFloor,
  setClickedRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorsScene);
