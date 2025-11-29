import { useState, useEffect } from "react";
import App from "../App";
import GameList from "../components/GameList";
import { useSearchParams } from "react-router-dom";

function Home() {
    const API_KEY = import.meta.env.VITE_API_KEY;// Leemos la variable de entorno (El cofre del tesoro)

    // ESTADOS


    const [busqueda, setBusqueda] = useState("")

    const [filtro, setFiltro] = useState({ tipe: '', slug: "" })

    const [selector, setselector] = useState("") // Muestra lista

    const [games, setGames] = useState([]);// 1. ESTADO: Inicializamos con un array vacío [] porque esperamos una lista de juegos.

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState()

    const [searchParams, setSearchParams] = useSearchParams({ tipe: '', slug: '' })




    // EFECTOS


    useEffect(() => { //peticion a la base de datos con ASYNC y AWAIT 
        console.log(searchParams)
        const parameters = searchParams.get("tipe") || "";
        const slug = searchParams.get("slug") || "";
        const page = searchParams.get('page') || 1;
        setLoading(true)
        const API_KEY_filtro = API_KEY + `${parameters}${slug}&page=${page}`
        const url = `https://api.rawg.io/api/games?key=${API_KEY_filtro}`
        console.log(url)
        // 2. PEDIDO: Construimos la URL con nuestra llave. Usamos comillas invertidas `` para insertar la variable.
        const obtenerJuegos = async () => {
            try {
                const respuesta = await fetch(url)
                const data = await respuesta.json()
                console.log("¡Datos recibidos!", data.results)
                setGames(data.results)
                setLoading(false)
                setselector('ok')
            }
            catch (error) {
                console.error("error en la respuesta del Api:", error);
                setLoading(false)
                setError(`Error: ${error.message}`)
                setselector('')
            }
        }
        obtenerJuegos()
    }, [searchParams])

    {/* // METODO VIEJO, SINCONO
    useEffect(() => {
      // Probamos si tenemos la llave (Solo para nosotros, en la consola)
      console.log("La API Key es:", API_KEY);
    }, [])
    useEffect(() => {
      setLoading(true)
      const url = `https://api.rawg.io/api/games?key=${API_KEY}`;// 2. PEDIDO: Construimos la URL con nuestra llave. Usamos comillas invertidas `` para insertar la variable.
      console.log("Llamando al Mesero (RAWG)...");
      fetch(url)// 3. FETCH: Llamamos al mesero <----------------------------------------------------
        .then(response => {// El mesero vuelve.
          if (!response.ok) { //Verificamos si trae el plato o una disculpa.
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json(); // "Destapamos" el JSON
        })
        //.then(res => res.json()) // lo mismo de ARRIBA pero simplificado
        .then(data => {
          setLoading(false)
          console.log("¡Datos recibidos!", data);// 4. RECEPCIÓN: Tenemos los datos limpios.
          setGames(data.results);// IMPORTANTE: En RAWG, la lista de juegos no está en 'data' directamente, sino dentro de una propiedad llamada 'results'. Esto es lo que aprendemos siendo "Exploradores".
        })
        .catch(error => {
          setLoading(false)
          console.error("El mesero se tropezó:", error);
        });
    }, []); // Array vacío: Solo pedimos la comida una vez al sentarnos.*/}



    // FUNCIONES


    const handleSlectorChange = (e) => {
        const value = e.target.value
        if (value === 'best') {
            console.log('preparando TODOS los mejores juegos')
            setSearchParams({ tipe: '', slug: '' })
            setselector('')
        }
        if (value === "rpg") {
            console.log('preparando juegos rpg')
            setSearchParams({ tipe: '&genres=', slug: 'role-playing-games-rpg' })
            setselector('')
        }
        if (value === 'shooter') {
            console.log('preparando juegos shooter')
            setSearchParams({ tipe: '&genres=', slug: 'shooter' })
            setselector('')
        }
        if (value === 'mmo') {
            console.log('preparando juegos mmo')
            setSearchParams({ tipe: '&genres=', slug: 'massively-multiplayer' })
            setselector('')
        }
        if (value === 'simulation') {
            console.log('preparando juegos simulation')
            setSearchParams({ tipe: '&genres=', slug: 'simulation' })
            setselector('')
        }
        if (value === 'adventure') {
            console.log('preparando juegos adventure')
            setSearchParams({ tipe: '&genres=', slug: 'adventure' })
            setselector('')
        }
        if (value === 'openWorld') {
            console.log('preparando juegos openWorlds')
            setSearchParams({ tipe: '&tags=', slug: 'open-world' })
            setselector('')
        }
    }

    const handleBusquedaChange = (e) => {
        const valor = e.target.value
        setBusqueda(valor)
        console.log(valor)
    }

    const handleSubmitBusqueda = () => {
        setSearchParams({ tipe: '&search=', slug: busqueda })
        setBusqueda('')
    }

    const handlerPageChange = (e) => {
        const valor = e.target.value
        const paginaActual = Number(searchParams.get('page')) || 1
        let nuevaPagina = paginaActual
        if (valor === 'back' && nuevaPagina > 1) nuevaPagina = paginaActual - 1;

        if (valor === 'next') nuevaPagina = paginaActual + 1;

        const paramsActual = Object.fromEntries([...searchParams])
        setSearchParams({ ...paramsActual, page: nuevaPagina })
        window.scrollTo(0, 0)
    }



    return (
        <>
            <h2>
                Choise your favorite style to encount the BEST
            </h2>
            <div className='selector-container'>
                <div className='selector-item'>
                    <p>buscar por tipo:</p>
                    <select name='selector' className="selector-games" onChange={handleSlectorChange}>
                        <option value="best">All</option>
                        <option value="rpg">RPG</option>
                        <option value="shooter">Shooters</option>
                        <option value="mmo">MMO</option>
                        <option value="simulation">Simulation</option>
                        <option value="adventure">Adventure</option>
                        <option value="openWorld">Open World</option>
                    </select>
                </div>
                <div className='selector-form'>
                    <p>buscar por nombre:</p>
                    <form onSubmit={(e) => {
                        e.preventDefault(); // ¡no olvidar! Evita que la página se recargue
                        handleSubmitBusqueda();
                    }}>
                        <input name='form' type='text' value={busqueda} onChange={handleBusquedaChange} onSubmit={handleSubmitBusqueda} />
                        <button type="submit">enviar</button>
                    </form>
                </div>
            </div>
            <div className='games-container'>
                {loading && <span className='loading'>cargando datos</span>}
                {selector && <GameList onerror={error} ongames={games} ></GameList>}
            </div>
            <div className="page-container">
                <button className="page-back" onClick={handlerPageChange} value={'back'}>
                    back
                </button>
                <button className="page-next" onClick={handlerPageChange} value={'next'}>
                    next
                </button>
            </div>
        </>
    )
}


export default Home