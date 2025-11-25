import { useState, useEffect } from "react";
import App from "../App"
import { useParams } from "react-router-dom"


function GameDetails() {
    const API_KEY = import.meta.env.VITE_API_KEY;

    // ESTADOS

    const parametros = useParams()
    console.log(parametros)


    const [gameDetails, setGameDetails] = useState()

    // EFECTOS
    useEffect(()=>{
        
    }, [])


    return (
        <div>
            <param name="game" value={parametros.id} />
            <h2>Detalles del Juego</h2>
            <p>Aquí veremos la info completa...</p>
        </div>
    )
}

export default GameDetails