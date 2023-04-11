import axios from "axios";
import { SET_USER_EVENTS } from "./types";
import { USER_EVENTS_ENDPOINT } from "../helpers/endpoints";

export const getUserEvents = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(USER_EVENTS_ENDPOINT)
      .then((response) => {
        dispatch({
          type: SET_USER_EVENTS,
          payload: { fetched: true, events: response.data },
        });

        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
