import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY;// Leemos la variable de entorno (El cofre del tesoro)

  // ESTADOS

  const [games, setGames] = useState([]);// 1. ESTADO: Inicializamos con un array vacío [] porque esperamos una lista de juegos.

  const [loading, setLoading] = useState(false)


  // EFECTOS


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
  }, []); // Array vacío: Solo pedimos la comida una vez al sentarnos.


  return (
    <>
      <h1>videojuegos RAWG</h1>
      {loading && <span>cargando datos</span>}
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

export default App
