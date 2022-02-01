// Packages
import { Route, Routes } from 'react-router-dom'

// Components
import Navbar from './components/Navbar.component'

// Pages
import Create from './pages/create/Create.page'
import Home from './pages/home/Home.page'
import Recipe from './pages/recipe/Recipe.page'
import Search from './pages/search/Search.page'
import ThemeSelector from './components/ThemeSelector.component'

// Styles
import './App.css'

function App() {


  return (
    <div className="App">
      <Navbar />
      <ThemeSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:link" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App
