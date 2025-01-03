import React from "react";
import "../styles/PartList.css"

function PartList({ parts, partIds, onGameClick }) {
    return (
        <div>
            <p><strong>Video games in this series:</strong></p>
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