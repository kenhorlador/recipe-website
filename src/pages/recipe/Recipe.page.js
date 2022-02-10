// Packages
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

// Firebase
import { projectFirestore } from '../../firebase/config'

// Styles
import './Recipe.styles.css'

export default function Recipe() {
  const { link } = useParams()
  let searchId = link.split('-')[0]

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {

    projectFirestore.collection('recipes').doc(searchId).get().then(doc => {

      setIsPending(true)

      // If a certain recipe exists, fetch that recipe
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      }
      // If the recipe does not exist, throw an error
      else {
        setIsPending(false)
        setError('Could not fetch that recipe')
      }
    })

  }, [searchId])

  return (
    <div className='recipe'>
      { isPending && <p className='loading'>Loading....</p> }
      { error && <p className='error'>{ error }</p> }
      { recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            { recipe.ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className='method'>{ recipe.method }</p>
        </>
      ) }
    </div>
  )
}
