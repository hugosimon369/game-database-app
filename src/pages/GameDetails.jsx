import { useState, useEffect } from "react";
import App from "../App"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function GameDetails() {
    const API_KEY = import.meta.env.VITE_API_KEY;

    // ESTADOS

    const parametros = useParams()

    const [gameDetails, setGameDetails] = useState()

    const [loadingDetails, setLoadingDetails] = useState(false)

    const [errorDetails, setErrorDetails] = useState('')

    const navigate = useNavigate()


    // EFECTOS


    useEffect(() => {
        setLoadingDetails(true)
        const id = `${parametros.id}`
        const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
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
        <div className="details-container">
            <param name="game" value={parametros.id} />
            <button
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px', cursor: 'pointer' }}
            >
                ⬅ Volver
            </button>
            {errorDetails && <p>{errorDetails}</p>}
            {loadingDetails && <p>Cargando detalles del juego</p>}
            {gameDetails &&
                <>
                    <div className='details-header'>
                        <h2>{gameDetails.name}</h2>
                        <img src={gameDetails.background_image} alt="" title={gameDetails.name} />
                    </div>
                    <div className="details-info">
                        <p>{gameDetails.description_raw}</p>
                        <p>{gameDetails.released}</p>
                        <a href={gameDetails.website} target="_blanck">sitio web</a>
                    </div>
                </>
            }
        </div>
    )
}

export default GameDetails