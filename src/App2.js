import React, { useRef, useState, Suspense } from "react";
import * as THREE from "three";

import { Canvas, useFrame, useLoader, useThree, extend } from "react-three-fiber";
//import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { softShadows, MeshWobbleMaterial } from "drei";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { TextureLoader, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./App.scss";
import { useSpring, a } from "react-spring/three";

//"homepage": "http://https://robertasliekis.github.io/3d-floors/",

extend({ OrbitControls });

softShadows();

const SpinningMesh = ({ position, color, speed, args }) => {
  const mesh = useRef();

  const material = new THREE.MeshStandardMaterial({
    color: "yellow"
  });
  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
  });

  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => {
        setExpand(!expand);
      }}
      scale={props.scale}
      material={material}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={args} />
    </a.mesh>
  );
};

const Floor = ({ position }) => {
  const [colors, setColors] = useState(false);

  const changeColor = (index) => {
    console.log(position);
    let currentColors = colors;
    setColors(!currentColors);
  };
  const { nodes } = useLoader(GLTFLoader, "./models/floor01.glb");

  return (
    <mesh geometry={nodes.floor1_1.geometry} onClick={() => changeColor(0)} rotation={[1.5, 0, 0]} position={position}>
      <meshStandardMaterial attach="material" color={colors ? "yellow" : "white"} />
    </mesh>
  );
};

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minDistance={150}
      // maxDistance={20}
      // enableZoom={false}
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI}
      //   minAzimuthAngle={-Math.PI / 4}
      // minPolarAngle={0}
    />
  );
};

//console.log(intersects);
//console.log("Gera");

const App = () => {
  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
        <CameraControls />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} color="yellow" />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          {/* <SpinningMesh position={[0, 1, 0]} color="lightblue" args={[3, 2, 1]} speed={2} />
          <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="pink" speed={6} /> */}
          <Suspense fallback={null}>
            <Floor position={[0, 10, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Floor position={[0, -10, 0]} />
          </Suspense>{" "}
          <Suspense fallback={null}>
            <Floor position={[0, 0, 0]} />
          </Suspense>
        </group>
        {/* <OrbitControls camera={[100, 200, 0]} /> */}
      </Canvas>
    </>
  );
};

export default App;
