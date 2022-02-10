// Packages
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import SearchBar from './SearchBar.component'

// Firebase
import { projectFirestore } from '../firebase/config'

// Styles
import './RecipeList.style.css'

// Svg
import Trashcan from '../assets/trashcan.svg'

export default function RecipeList({ data }) {

  const [searchField, setSearchField] = useState('')
  const [info, setInfo] = useState(data)

  const onSearchChange = (event) => {
    setSearchField(event.target.value)
  }

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
  }, [searchField])

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  return (
    <>
    <SearchBar searchChange={ onSearchChange } />
    <div className="recipe-list">
      { !info.length && <div>No recipes with title equivalent to <strong>'{ searchField }'</strong></div>}
      { info.map(recipe => (
        <div key={ recipe.id } className="card">
          <h3>{ recipe.title }</h3>
          <p>{ recipe.cookingTime } to make.</p>
          <p>{ recipe.method.substring(0, 100)}...</p>
          <Link to={recipe.link === undefined ? '/' : `/recipes/${ recipe.link }`} children="Cook this" />
          <img
            src={Trashcan}
            className="deleteIcon"
            onClick={() => handleDelete(recipe.id)}
            alt="delete icon"
          />
        </div>
      )) }
    </div>
    </>
  )
}
