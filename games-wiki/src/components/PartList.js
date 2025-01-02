import React from "react";

function PartList({ parts, partIds, onGameClick }) {
    return (
        <div>
            <h3> Video games in this series:</h3>
            <ul>
                {parts.map((part, index) => (
                    <li key={index}>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            const wd = partIds[index].split("/").pop();
                            onGameClick(wd);
                        }} >
                            {part}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PartList;