// Packages
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import SearchBar from './SearchBar.component'

// Styles
import './RecipeList.style.css'

export default function RecipeList({ data }) {

  const [searchField, setSearchField] = useState('')
  const [info, setInfo] = useState(data)

  const onSearchChange = (event) => {
    console.log(event.target.value)
    setSearchField(event.target.value)
  }

  console.log("recipes", info)

  useEffect(() => {
    const filteredData = data.filter(filtered => {
      return filtered.title.toLowerCase().includes(searchField.toLowerCase())
    })
    setInfo(filteredData)
  }, [data, searchField])

  useEffect(() => { 
    setInfo(prevRecipe => {
      return prevRecipe.map(recipe => {
        return {...recipe, link: `${recipe.id}-${recipe.title.trim().toLowerCase().split(' ').join('-')}`}
      })
    })
  }, [])

  return (
    <>
    <SearchBar searchChange={ onSearchChange } />
    <div className="recipe-list">
      { info.map(recipe => (
        <div key={ recipe.id } className="card">
          <h3>{ recipe.title }</h3>
          <p>{ recipe.cookingTime } to make.</p>
          <p>{ recipe.method.substring(0, 100)}...</p>
          <Link to={`/recipes/${ recipe.link }`} children="Cook this" />
        </div>
      )) }
    </div>
    </>
  )
}
