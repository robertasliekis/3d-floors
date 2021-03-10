const initialState = {
  clickedFloor: null,
  clickCount: 0
};

const setClickedFloor = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLICKED_FLOOR":
      return { ...state, clickedFloor: action.payload, clickCount: state.clickCount + 1 };
    default:
      return state;
  }
};

export default setClickedFloor;
