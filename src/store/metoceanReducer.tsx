import * as actionTypes from "./actionTypes";

// set initial state
const initialState = {
  hourlyData: [],
  columns: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    // save data to the store
    case actionTypes.GET_HOULY_DATA:
      return {
        ...state,
        hourlyData: action.data,
      };
    // save columns to the store
    case actionTypes.GET_COLUMNS:
      return {
        ...state,
        columns: action.columns,
      };
    default:
      return state;
  }
};
