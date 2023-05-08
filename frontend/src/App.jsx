import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { useState } from 'react'
import './App.css'

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>  
        
    </>
  )
}

export default App