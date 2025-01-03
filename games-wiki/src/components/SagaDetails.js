import React from "react";

function SagaDetails({ details }) {
    return (
        <div>
            <p><strong>Original title:</strong> {details.originalTitle}</p>
            <p><strong>Genre:</strong> {details.genre.join(", ")}</p>
            <p><strong>Publisher:</strong> {details.publisher}</p>
            <p><strong>Platform(s):</strong> {details.platforms.join(", ")}</p>
        </div>
    );
}

export default SagaDetails;