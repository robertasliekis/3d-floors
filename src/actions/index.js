export const setClickedFloor = (index) => {
  return {
    type: "SET_CLICKED_FLOOR",
    payload: index
  };
};
export const setClickedRoom = (index) => {
  return {
    type: "SET_CLICKED_ROOM",
    payload: index
  };
};
