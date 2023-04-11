import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Post from '../components/post/Post';
import NoPosts from '../components/utils/NoPosts';
import {  PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints';
import Placeholder from '../components/utils/Placeholder';

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        axios.get(PUBLIC_POSTS_ENDPOINT).then(response => {
            setPosts(response.data);
            setFetching(false);
        }).catch(e => {
            setFetching(false);
        })
    }, []);

    return (
        <div>
            <Jumbotron>
                <h1>Ultimos posts publicos</h1>
            </Jumbotron>
            { fetching && <Placeholder></Placeholder> }
            { !fetching && posts.length === 0 && <NoPosts text="No hay post publicos disponibles"></NoPosts> }
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>) }
            </div>
        </div>
    )
}
