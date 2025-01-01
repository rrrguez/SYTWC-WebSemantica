import React from "react";

function PartList({ parts }) {
    return (
        <div>
            <h3> Video games in this series:</h3>
            <ul>
                {parts.map((part, index) => (
                    <li key={index}>{part}</li>
                ))}
            </ul>
        </div>
    );
}

export default PartList;