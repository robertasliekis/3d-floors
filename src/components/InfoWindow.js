import React from "react";
import { connect } from "react-redux";

import { setClickedFloor } from "../actions";

function InfoWindow({ clickedFloor, setClickedFloor }) {
  return (
    <div className="info-container" style={{ right: clickedFloor !== null ? "0%" : "-100%" }}>
      <h1>{`Floor ${clickedFloor + 1}`}</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa explicabo, alias a eum cumque vel praesentium dolores consequuntur
        debitis blanditiis perferendis tempore tenetur qui. Esse odio aperiam rerum reiciendis soluta.
      </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
