import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree, extend } from "react-three-fiber";
import { softShadows } from "drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./App.scss";

extend({ OrbitControls });

softShadows();

//"homepage": "http://https://robertasliekis.github.io/3d-floors/",

const Floor = () => {
  const ref = useRef();
  const floorRefs = useRef(new Array());
  const materialRefs = useRef(new Array());

  useFrame((state) => {
    //   const t = state.clock.getElapsedTime();
    const animationSpeed = 1;
    if (clickedFloor !== null) {
      //  floorRefs.current[clickedFloor].position.y += 1;
      floorRefs.current.forEach((ref, index) => {
        let indexDifference = Math.abs(clickedFloor - index);
        if (clickedFloor !== index) {
          //  materialRefs.current[index].opacity -= 0.02;
          if (clickedFloor < index) {
            if (ref.position.y < index * 10 + indexDifference * 20) {
              ref.position.y += animationSpeed;
            }
          } else {
            if (ref.position.y > index * 10 - indexDifference * 20) {
              ref.position.y -= animationSpeed;
            }
          }
        } else {
          if (ref.position.y < index * 10) {
            ref.position.y += animationSpeed;
          }
        }
      });
    } else {
      floorRefs.current.forEach((ref, index) => {
        if (ref.position.y > index * 10) {
          //   materialRefs.current[index].opacity += 0.1;
          ref.position.y -= animationSpeed;
        } else if (ref.position.y < index * 10) {
          //  materialRefs.current[index].opacity += 0.1;
          ref.position.y += animationSpeed;
        }
      });
    }
    // if (positionZ && ref.current.position.y < 50) {
    //     ref.current.position.y += 1;
    // }
    // if (!positionZ && ref.current.position.y > 10) {
    //       ref.current.position.y -= 1;
    // }
  });

  const [colors, setColors] = useState(false);
  const [positionZ, setPositionZ] = useState(false);
  const [colors2, setColors2] = useState(false);

  const [hovered, setHovered] = useState([false, false, false, false, false]);
  const [clickedFloor, setClickedFloor] = useState(null);

  const changeColor = () => {
    let currentColors = colors;
    setColors(!currentColors);
  };
  const { nodes } = useLoader(GLTFLoader, "./models/floor01.glb");

  const hoveredOnFloor = (index, mouseInside) => {
    if (clickedFloor === null) {
      let hoveredArray = [...hovered];
      if (mouseInside) {
        hoveredArray[index] = true;
      } else {
        hoveredArray[index] = false;
      }
      setHovered(hoveredArray);
    } else {
      setHovered([false, false, false, false, false]);
    }
  };

  const clickedOnFloor = (index) => {
    if (clickedFloor === null) {
      setClickedFloor(index);
    } else if (clickedFloor === index) {
      setClickedFloor(null);
    }
    // if (clickedFloor !== index) {
    //   setClickedFloor(index);
    // } else {
    //   setClickedFloor(null);
    // }
  };

  const floorObjects = [0, 1, 2, 3, 4];

  return (
    <group>
      {floorObjects.map((floorObject, index) => (
        <mesh
          className={`floor floor${index}`}
          key={index}
          ref={(e) => (floorRefs.current[index] = e)}
          dispose={null}
          onPointerOver={(e) => (e.stopPropagation(), hoveredOnFloor(index, true))}
          onPointerOut={(e) => e.intersections.length && hoveredOnFloor(index, false)}
          onClick={(e) => (e.stopPropagation(), clickedOnFloor(index))}
          geometry={nodes.floor1_1.geometry}
          opacity={0.5}
          rotation={[1.5, 0, 0]}
          position={[0, 10 * index, 0]}
        >
          <meshStandardMaterial
            attach="material"
            ref={(e) => (materialRefs.current[index] = e)}
            // opacity={1}
            transparent={true}
            color={hovered[index] ? "yellow" : "white"}
          />
        </mesh>
      ))}
      {/* <mesh
        ref={ref}
        dispose={null}
        onPointerOver={(e) => (e.stopPropagation(), mouseHoveredOnFloor(0))}
        onPointerOut={(e) => e.intersections.length && mouseHoveredOnFloor(0)}
        onClick={(e) => e.intersections.length && setPositionZ(!positionZ)}
        geometry={nodes.floor1_1.geometry}
        rotation={[1.5, 0, 0]}
        position={[0, 10, 0]}
      >
        <meshStandardMaterial attach="material" color={hovered[0] ? "yellow" : "white"} />
      </mesh>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), mouseHoveredOnFloor(1))}
        onPointerOut={(e) => e.intersections.length && mouseHoveredOnFloor(1)}
        geometry={nodes.floor1_1.geometry}
        // onClick={() => changeColor()}
        rotation={[1.5, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial attach="material" color={hovered[1] ? "blue" : "white"} />
      </mesh> */}
    </group>
  );
};

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} minDistance={150} />;
};

const App = () => {
  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
        <CameraControls />
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <group>
          <Suspense fallback={null}>
            <Floor />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
};

export default App;
