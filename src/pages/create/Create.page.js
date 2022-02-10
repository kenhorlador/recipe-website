// Packages
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Firebase
import { projectFirestore } from '../../firebase/config'

// Styles
import './Create.styles.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)

  const navigate = useNavigate()


  // Submits the form
  const handleSubmit = async (event) => {
    event.preventDefault()
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' }

    try {
      await projectFirestore.collection('recipes').add(doc)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  // Add ingredient to the array
  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  // Remove ingredient in the array
  const handleRemove = (item) => {
    const currentItem = item.target.innerText
    if (ingredients.includes(currentItem)) {
      const filteredIngredients = ingredients.filter(filterIng => filterIng !== currentItem)
      setIngredients(filteredIngredients)
    }
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>

      <form onSubmit={ handleSubmit }>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={ title }
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />

            <button
              className='btn'
              onClick={handleAdd}
            >Add</button>

          </div>
          <div className="ingredients-container">Current ingredients:
            {ingredients && ingredients.map(ingredient =>
              <span onClick={handleRemove} key={ingredient}>{ingredient}</span>
            )}
          </div>
        </label>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={ method }
            required
          />
        </label>

        <label>
          <span>Cooking time(minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={ cookingTime }
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
