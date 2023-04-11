import React from 'react';
import "placeholder-loading/dist/css/placeholder-loading.min.css";


export default function Placeholder() {
    return (
        <div className="columns is-centered">
            <div className="column is-10">
                <div className="ph-item">    
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row"></div>
                        <div className="ph-col-12"></div>
                    </div>
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row"></div>
                        <div className="ph-col-12"></div>
                    </div>    
                </div>
            </div>            
        </div>
    )
}
