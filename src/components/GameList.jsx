import React from "react";
import App from "../App";

function SearchBestGames({ onerror, ongames }) {

    const games = ongames
    const error = onerror

    return (
        <>
            {error && <span className='error'>codigo: {error}</span>}
            <p>Juegos encontrados: {games.length}</p>
            <div className="games-container">
                {games.map(game => (
                    <div className="games-item" key={game.id}>{game.name}
                        <img src={game.background_image} alt={`imagen del juego ${game.name}`} title={game.name}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchBestGames