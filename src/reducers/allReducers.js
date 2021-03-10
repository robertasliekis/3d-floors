import { combineReducers } from "redux";
import setClickedFloor from "./setClickedFloor";
import setClickedRoom from "./setClickedRoom";

export default combineReducers({
  setClickedFloor: setClickedFloor,
  setClickedRoom: setClickedRoom
});
