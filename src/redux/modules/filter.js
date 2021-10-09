import { createActions, handleActions } from "redux-actions";

export const { showAll, showComplete } = createActions(
  "SHOW_ALL",
  "SHOW_COMPLETE",
  {
    prefix: "redux-review/filter",
  }
);

const initialState = "ALL";

const reducer = handleActions(
  {
    SHOW_ALL: () => "ALL",
    SHOW_COMPLETE: () => "COMPLETE",
  },
  initialState,
  { prefix: "redux-review/filter" }
);

export default reducer;
