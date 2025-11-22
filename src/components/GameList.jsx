import React from "react";
import App from "../App";

function SearchBestGames({ onerror, ongames }) {

    const games = ongames
    const error = onerror

    return (
        <>
            {error && <span className='error'>codigo: {error}</span>}
            <p>Juegos encontrados: {games.length}</p>
            <ul>
                {/* Un pequeño adelanto: mostremos los nombres */}
                {games.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </>
    )
}

export default SearchBestGames