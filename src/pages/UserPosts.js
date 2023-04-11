import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Post from '../components/post/Post';
import Placeholder from '../components/utils/Placeholder';
import { useSelector, useDispatch } from 'react-redux';
import NoPosts from '../components/utils/NoPosts';
import { getUserPosts } from '../actions/postActions';
import { toast } from 'react-toastify';

export default function UserPosts() {
   
    const [fetching, setFetching] = useState(false);
    const fetched = useSelector(state => state.posts.fetched);
    const posts = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
       async function fetchedPosts() {
            if (!fetched) {
                try {
                    setFetching(true);
                    await dispatch(getUserPosts());
                    setFetching(false);
                }catch(err) {
                    toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
                }
            }
       }
       fetchedPosts();
    }, [dispatch, fetched]);

    return (
        <div>
            <Jumbotron>
                <h1>Mis posts</h1>
            </Jumbotron>
            { fetching && <Placeholder></Placeholder> }
            { !fetching && posts.length === 0 && <NoPosts text="No hay post privados disponibles"></NoPosts> }
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={true} ></Post>) }
            </div>
        </div>
    )
}
