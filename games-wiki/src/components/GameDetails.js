import React from "react";

function DateFormat( date ) {
    if (!date) return "Not specified";

    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return new Date(date).toLocaleDateString('en-GB', dateOptions);
}

function GameDetails({ details }) {
    const releaseDate = DateFormat(details.releaseDate);
    const announcementDate = DateFormat(details.announcementDate);
    const sales = details.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div>
            <h2>{details.title}</h2>
            {details.logo && <img src={details.logo} alt={`${details.title} logo`} />}
            <p><strong>Original title:</strong> {details.originalTitle}</p>
            <p><strong>Genre(s):</strong> {details.genre.join(", ")}</p>
            <p><strong>Publisher:</strong> {details.publisher}</p>
            <p><strong>Country of origin:</strong> {details.country}</p>
            <p><strong>Release date:</strong> {releaseDate} <img className="flag" src={details.flagImage} alt=""></img></p>
            <p><strong>Units sold:</strong> {sales} </p>
            <p><strong>Developer:</strong> {details.developer}</p>
            <p><strong>Platform(s):</strong> {details.platform.join(", ")}</p>
            <p><strong>Game mode(s):</strong> {details.gameMode.join(", ")}</p>
            <p><strong>Announcement date:</strong> {announcementDate} </p>
        </div>
    );
}

export default GameDetails;