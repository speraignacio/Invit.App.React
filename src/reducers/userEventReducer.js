import { SET_USER_EVENTS } from "../actions/types";

const initialState = { events: [], fetched: false };

export default function userEventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_EVENTS:
      return {
        ...state,
        fetched: payload.fetched,
        events: payload.events,
      };
    default:
      return state;
  }
}
