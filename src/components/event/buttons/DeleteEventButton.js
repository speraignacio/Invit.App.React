import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { DELETE_EVENT_ENDPOINT } from "../../../helpers/endpoints";
import { useDispatch } from "react-redux";
import { getUserEvents } from "../../../actions/eventActions";
import { toast } from "react-toastify";

export default function DeleteEventButton({ eventId, title }) {
  const dispatch = useDispatch();

  const createAlert = () => {
    confirmAlert({
      title: "Eliminar evento",
      message: `Estas seguro que deseas eliminar el evento ${title}`,
      buttons: [
        {
          label: "Si",
          onClick: () => {
            deleteEvent();
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`${DELETE_EVENT_ENDPOINT}/${eventId}`);

      await dispatch(getUserEvents());

      toast.info("El evento se ha eliminado", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <Button onClick={createAlert} variant="primary" size="sm">
      Eliminar
    </Button>
  );
}
