import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloorsModel = ({ clickedFloor, onClickedFloorChange }) => {
  const floorRefs = useRef(new Array());
  const materialRefs = useRef(new Array());

  useFrame(() => {
    //   const t = state.clock.getElapsedTime();
    const animationSpeed = 1;
    if (clickedFloor !== null) {
      //  floorRefs.current[clickedFloor].position.y += 1;
      floorRefs.current.forEach((ref, index) => {
        let indexDifference = Math.abs(clickedFloor - index);
        if (clickedFloor !== index) {
          materialRefs.current[index].opacity = 0.2;
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
          materialRefs.current[index].opacity = 1;
          //   materialRefs.current[index].opacity += 0.1;
          ref.position.y -= animationSpeed;
        } else if (ref.position.y < index * 10) {
          materialRefs.current[index].opacity = 1;
          //  materialRefs.current[index].opacity += 0.1;
          ref.position.y += animationSpeed;
        }
      });
    }
  });

  const [colors, setColors] = useState(false);
  const [hovered, setHovered] = useState([false, false, false, false, false]);

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
      onClickedFloorChange(index);
    } else if (clickedFloor === index) {
      onClickedFloorChange(null);
    }
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
            transparent={true}
            color={hovered[index] ? "red" : "white"}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloorsModel;
