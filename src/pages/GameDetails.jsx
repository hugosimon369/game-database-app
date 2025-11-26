import { useState, useEffect } from "react";
import App from "../App"
import { useParams } from "react-router-dom"


function GameDetails() {
    const API_KEY = import.meta.env.VITE_API_KEY;

    // ESTADOS

    const parametros = useParams()
    console.log(parametros)
    console.log(API_KEY)

    const [gameDetails, setGameDetails] = useState()

    const [loadingDetails, setLoadingDetails] = useState(false)

    const [errorDetails, setErrorDetails] = useState('')


    // EFECTOS


    useEffect(() => {
        setLoadingDetails(true)
        const id = `${parametros.id}`
        const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        console.log(url)
        const obtenerJuegos = async () => {
            try {
                const respuesta = await fetch(url)
                const data = await respuesta.json()
                console.log("¡Detalles recibidos!", data)
                setGameDetails(data)
                setLoadingDetails(false)
                setErrorDetails('')
            }
            catch (error) {
                console.error("Error en la respuesta del Api:", error);
                setLoadingDetails(false)
                setErrorDetails(`Error en la respuesta del Api: ${error.message}`)
            }
        }
        obtenerJuegos()
    }, [parametros])


    return (
        <div>
            <param name="game" value={parametros.id} />
            {errorDetails && <p>{errorDetails}</p>}
            {loadingDetails && <p>Cargando detalles del juego</p>}
            {gameDetails &&
                <>
                    <h2>{gameDetails.name}</h2>
                    <img src={gameDetails.backgrond_image} alt="" title={gameDetails.name} />
                    <p>{gameDetails.description_raw}</p>
                    <p>{gameDetails.released}</p>
                    <a href={gameDetails.website} target="_blanck">sitio web</a>
                </>
            }
        </div>
    )
}

export default GameDetails