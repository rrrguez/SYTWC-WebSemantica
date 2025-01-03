import React from "react";
import "../styles/GameDetails.css"

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
        <div className="game-details">
            {details.logo ? (
                <img src={details.logo} alt={`${details.title} logo`} className="game-logo"/>
            ) : (
                <h2>{details.title}</h2>
            )}
            <p><strong>Original title:</strong> {details.originalTitle}</p>
            <p><strong>Genre(s):</strong> {details.genre.join(", ")}</p>
            <p><strong>Publisher:</strong> {details.publisher}</p>
            <p><strong>Developer(s):</strong> {details.developer.join(", ")}</p>
            <p><strong>Platform(s):</strong> {details.platform.join(", ")}</p>
            <p><strong>Game mode(s):</strong> {details.gameMode.join(", ")}</p>
            <p><strong>Country of origin:</strong> {details.country}</p>
            <p><strong>Units sold:</strong> {sales} </p>
            <p><strong>Announcement date:</strong> {announcementDate} </p>
            <p><strong>Release date:</strong> {releaseDate} {details.flag && <img className="flag" src={details.flagImage} alt=""></img>} </p>
        </div>
    );
}

export default GameDetails;