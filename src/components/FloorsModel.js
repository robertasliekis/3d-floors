import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloorsModel = ({ clickedFloor, clickedRoom, clickCount, onClickedFloorChange, onClickedRoomChange }) => {
  const buildingRef = useRef();
  const floorRefs = useRef([]);
  const materialRefs = useRef([]);
  const roomRefs = useRef([[], [], [], [], []]);
  const sideRefs = useRef([]);

  useFrame(() => {
    //   const t = state.clock.getElapsedTime();
    const animationSpeed = 2;
    buildingRef.current.rotation.y += 0.001;
    if (clickedFloor !== null) {
      floorRefs.current.forEach((ref, index) => {
        let indexDifference = Math.abs(clickedFloor - index);
        if (clickedFloor !== index) {
          materialRefs.current[index].opacity = 0.2;
          sideRefs.current[index].opacity = 0.2;
          roomRefs.current[index].forEach((roomRef) => {
            roomRef.opacity = 0.2;
          });
          if (clickedFloor < index) {
            if (ref.position.y < index * 10 + indexDifference * 30) {
              ref.position.y += animationSpeed;
            }
          } else {
            if (ref.position.y > index * 10 - indexDifference * 30) {
              ref.position.y -= animationSpeed;
            }
          }
        } else {
          if (ref.position.y < index * 10) {
            ref.position.y += animationSpeed;
          }
        }
      });
    } else if (clickCount !== 0) {
      floorRefs.current.forEach((ref, index) => {
        roomRefs.current[index].forEach((roomRef) => {
          roomRef.opacity = 1;
        });
        if (ref.position.y > index * 10) {
          materialRefs.current[index].opacity = 1;
          sideRefs.current[index].opacity = 1;
          //   materialRefs.current[index].opacity += 0.1;
          ref.position.y -= animationSpeed;
        } else if (ref.position.y < index * 10) {
          materialRefs.current[index].opacity = 1;
          sideRefs.current[index].opacity = 1;
          //  materialRefs.current[index].opacity += 0.1;
          ref.position.y += animationSpeed;
        }
      });
    }
  });

  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const { nodes } = useLoader(GLTFLoader, "./models/floor01.glb");

  const floorRooms = [
    nodes.floor_room_0_1,
    nodes.floor_room_1_1,
    nodes.floor_room_2_1,
    nodes.floor_room_3_1,
    nodes.floor_room_4_1,
    nodes.floor_room_5_1
  ];

  const hoveredOnFloor = (index, mouseInside) => {
    if (clickedFloor === null) {
      if (mouseInside) {
        setHoveredFloor(index);
      } else if (hoveredFloor === index) {
        setHoveredFloor(null);
      }
    } else {
      setHoveredFloor(null);
    }
  };

  const clickedOnFloor = (index) => {
    if (clickedFloor === null) {
      onClickedFloorChange(index);
      setHoveredFloor([false, false, false, false, false]);
    }
    // else if (clickedFloor === index) {
    //   onClickedFloorChange(null);
    // }
  };

  const clickedOnRoom = (index, event) => {
    if (clickedFloor !== null) {
      event.stopPropagation();
      onClickedRoomChange(index);
    }
  };

  const hoveredOnRoom = (floorIndex, roomIndex, mouseInside, event) => {
    if (clickedFloor !== null && clickedFloor === floorIndex) {
      event.stopPropagation();

      if (mouseInside) {
        setHoveredRoom(roomIndex);
      } else if (hoveredRoom === roomIndex) {
        setHoveredRoom(null);
      }
    }
  };

  const convertDegreesToRadians = (x, y, z) => {
    let degrees = [x, y, z];
    return (degrees = degrees.map((degree) => degree * (Math.PI / 180)));
  };

  const floorObjects = [0, 1, 2, 3, 4];
  return (
    <group ref={buildingRef}>
      {floorObjects.map((floorObject, floorIndex) => (
        <group
          key={floorIndex}
          ref={(e) => (floorRefs.current[floorIndex] = e)}
          position={[0, 10 * floorIndex, 0]}
          rotation={convertDegreesToRadians(90, 180, 0)}
        >
          <mesh
            dispose={null}
            onPointerOver={(e) => {
              e.stopPropagation();
              hoveredOnFloor(floorIndex, true);
            }}
            onPointerOut={(e) => {
              e.intersections.length && hoveredOnFloor(floorIndex, false);
            }}
            onClick={(e) => {
              e.stopPropagation();
              clickedOnFloor(floorIndex);
            }}
            geometry={nodes.floor_top_1.geometry}
          >
            <meshStandardMaterial
              attach="material"
              ref={(e) => (materialRefs.current[floorIndex] = e)}
              transparent={true}
              color={"white"}
            />
          </mesh>
          <mesh geometry={nodes.floor_side_1.geometry}>
            <meshStandardMaterial
              attach="material"
              ref={(e) => (sideRefs.current[floorIndex] = e)}
              transparent={true}
              color={hoveredFloor === floorIndex ? "#00FBFF" : "grey"}
            />
          </mesh>
          {floorRooms.map((floorRoom, roomIndex) => (
            <group key={roomIndex}>
              <mesh
                geometry={floorRoom.geometry}
                onPointerOver={(e) => {
                  hoveredOnRoom(floorIndex, roomIndex, true, e);
                }}
                onPointerOut={(e) => {
                  hoveredOnRoom(floorIndex, roomIndex, false, e);
                }}
                onClick={(e) => {
                  clickedOnRoom(roomIndex, e);
                }}
              >
                <meshStandardMaterial
                  attach="material"
                  ref={(e) => (roomRefs.current[floorIndex][roomIndex] = e)}
                  transparent={true}
                  color={
                    (clickedFloor === floorIndex && hoveredRoom === roomIndex) || (clickedFloor === floorIndex && clickedRoom === roomIndex)
                      ? "yellow"
                      : "#E3E3E3"
                  }
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

export default FloorsModel;
