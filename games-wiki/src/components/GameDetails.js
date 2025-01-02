import React from "react";

function GameDetails({ details }) {
    return (
        <div>
            <h2>{details.title}</h2>
            {details.logo && <img src={details.logo} alt={`${details.title} logo`} />}
            <p><strong>Original title:</strong> {details.originalTitle}</p>
            <p><strong>Genre(s):</strong> {details.genre.join(", ")}</p>
            <p><strong>Publisher:</strong> {details.publisher}</p>
            <p><strong>Country of origin:</strong> {details.country}</p>
            <p><strong>Release date:</strong> {details.releaseDate}</p>
            <p><strong>Units sold:</strong> {details.sales}</p>
            <p><strong>Developer:</strong> {details.developer}</p>
            <p><strong>Platform(s):</strong> {details.platform.join(", ")}</p>
            <p><strong>Game mode(s):</strong> {details.gameMode.join(", ")}</p>
            <p><strong>Announcement date:</strong> {details.announcementDate}</p>
        </div>
    );
}

export default GameDetails;