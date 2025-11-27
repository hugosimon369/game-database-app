import React from "react";
import App from "../App";
import { Link } from "react-router-dom"

function GameList({ onerror, ongames }) {

    const games = ongames
    const error = onerror

    return (
        <>
            {error && <span className='error'>codigo: {error}</span>}
            <p>Juegos encontrados: {games.length}</p>
            <div className="games-container">
                {games.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id}>
                        <div className="games-item" >
                            <p>{game.name}</p>
                            <img src={game.background_image} alt={`imagen del juego ${game.name}`} title={game.name} />
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default GameList