import axios from "axios";
import { push } from "connected-react-router";
import { put, call, delay, takeEvery } from "redux-saga/effects";

export const GET_USERS_START = "redux-review/users/GET_USERS_START";
export const GET_USERS_SUCCESS = "redux-review/users/GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "redux-review/users/GET_USERS_FAILURE";

export const GET_USERS_PENDING = "redux-review/users/GET_USERS_PENDING";
export const GET_USERS_FULFILLED = "redux-review/users/GET_USERS_FULFILLED";
export const GET_USERS_REJECTED = "redux-review/users/GET_USERS_REJECTED";

const GET_USERS = "GET_USERS";

export function getUsersStart() {
  return { type: GET_USERS_START };
}

export function getUsersSuccess(data) {
  return { type: GET_USERS_SUCCESS, data };
}

export function getUsersFailure(error) {
  return { type: GET_USERS_FAILURE, error };
}

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_USERS_START || action.type === GET_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return { ...state, loading: false, data: action.data };
  }

  if (action.type === GET_USERS_FULFILLED) {
    return { ...state, loading: false, data: action.payload };
  }
  if (action.type === GET_USERS_FAILURE) {
    return { ...state, loading: false, error: action.error };
  }
  if (action.type === GET_USERS_REJECTED) {
    return { ...state, loading: false, error: action.payload };
  }
  return state;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function getUsersThunk() {
  return async (dispatch, getState, { history }) => {
    try {
      console.log(history);
      dispatch(getUsersStart());
      await sleep(2000);
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
      history.push("/");
    } catch (error) {
      console.log(error);
      dispatch(getUsersFailure(error));
    }
  };
}

export function getUsersPromise() {
  return {
    type: GET_USERS,
    payload: async () => {
      const res = await axios.get("https://api.github.com/users");
      return res.data;
    },
  };
}

const GET_USERS_SAGA_START = "GET_USERS_SAGA_START";

function* getUsersSaga(action) {
  try {
    yield put(getUsersStart());
    yield delay(2000);
    const res = yield call(axios.get, "https://api.github.com/users");
    yield put(getUsersSuccess(res.data));
    yield put(push("/"));
  } catch (error) {
    console.log(error);
    yield put(getUsersFailure(error));
  }
}

export function getUsersSagaStart() {
  return {
    type: GET_USERS_SAGA_START,
  };
}

export function* usersSaga() {
  yield takeEvery(GET_USERS_SAGA_START, getUsersSaga);
}
