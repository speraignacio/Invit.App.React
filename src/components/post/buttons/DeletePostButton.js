import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { DELETE_POST_ENDPOINT } from '../../../helpers/endpoints';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../../../actions/postActions';
import { toast } from 'react-toastify';


export default function DeletePostButton({ postId, title }) {

    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: "Eliminar post",
            message: `Estas seguro que deseas eliminar el post ${title}`,
            buttons: [
                {
                    label: 'Si',
                    onClick: () => { deletePost() }
                },
                {
                    label: 'No',
                    onClick: () => { return false; }
                }
            ]
        });
    }

    const deletePost = async () => {
        try {
            await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`);

            await dispatch(getUserPosts());

            toast.info("El post se ha eliminado", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
        
        } catch(err) {
            toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
        }
    }

    return (
        <Button 
            onClick={ createAlert }
            variant="primary" 
            size="sm">Eliminar</Button>
    )
}
