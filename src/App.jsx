import { useState, useEffect } from 'react'
import './App.css'
import GamesList from './components/GameList';
import Home from './pages/Home'
import GameDetails from './pages/GameDetails';

import { Route, Routes } from 'react-router-dom';

function App() {


  return (
    <>
      <div>
        <h1>
          Top Games
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/game/:id' element={<GameDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
