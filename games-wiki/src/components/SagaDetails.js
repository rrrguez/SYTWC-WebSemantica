import React from "react";

function SagaDetails({ details }) {
    return (
        <div>
            <h2>{details.title}</h2>
            {details.logo && <img src={details.logo} alt={`${details.title} logo`} />}
            <p><strong>Original title:</strong> {details.originalTitle}</p>
            <p><strong>Genre:</strong> {details.genre}</p>
            <p><strong>Publisher:</strong> {details.publisher}</p>
            <p><strong>Platform(s):</strong> {details.platforms.join(", ")}</p>
        </div>
    );
}

export default SagaDetails;