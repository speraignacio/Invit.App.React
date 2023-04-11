import React from 'react';
import nada from '../../assets/nada.svg';

export default function NoPosts({ text }) {
    return (
        <div className="no-posts-component">
            <div className="post-image-container">
                <object type="image/svg+xml" data={nada}>
                    Error al cargar svg
                </object>
                <p>{ text }</p>
            </div>
        </div>
    )
}
