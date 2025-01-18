import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'


function App() {
  

  return (
   <BrowserRouter>
   <Layout>
   <Routes>
    <Route path='/dashboard' element={<Dashboard/>}/>

   </Routes>
   </Layout>
   </BrowserRouter>
  
  )
}

export default App
