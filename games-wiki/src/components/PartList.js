import React from "react";

function PartList({ parts, onGameClick }) {
    return (
        <div>
            <h3> Video games in this series:</h3>
            <ul>
                {parts.map((part, index) => (
                    <li key={index}>
                        <button onClick={() => onGameClick(part.key)}>
                            {part.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PartList;