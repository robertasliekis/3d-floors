import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { setClickedFloor, setClickedRoom } from "../actions";

function InfoWindow({ clickedFloor, clickedRoom, setClickedFloor, setClickedRoom }) {
  const floorText = [
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Impedit, veniam dignissimos odit repudiandae iste id fugiat tenetur necessitatibus amet aspernatur voluptas dolorem deserunt dolores, reprehenderit minima! Asperiores,  praesentium delectus optio perspiciatis quae est ea.",
    "Sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Dolor sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta."
  ];
  const roomText = [
    "Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Impedit, veniam dignissimos odit repudiandae iste id fugiat tenetur necessitatibus amet aspernatur voluptas dolorem deserunt dolores, reprehenderit minima! Asperiores,  praesentium delectus optio perspiciatis quae est ea.",
    "Sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Dolor sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.",
    "Adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta."
  ];

  return (
    <div className="info-window" style={{ right: clickedFloor !== null ? "0%" : "-100%" }}>
      <div
        className="btn btn-close"
        onClick={() => {
          setClickedFloor(null);
          setClickedRoom(null);
        }}
      >
        <FontAwesomeIcon icon={faTimes} className="icon" />
      </div>
      <div className="floor-container container">
        <h1>{`Floor ${clickedFloor + 1}`}</h1>
        <p>{floorText[clickedFloor]}</p>
      </div>
      <div className="room-container container" style={{ display: clickedRoom !== null ? "flex" : "none" }}>
        <h1>{`Room ${clickedRoom + 1}`}</h1>
        <p>{roomText[clickedRoom]}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor,
    clickedRoom: state.setClickedRoom.clickedRoom
  };
};

const mapDispatchToProps = {
  setClickedFloor,
  setClickedRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
