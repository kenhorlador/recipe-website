// Packages
import { useParams } from 'react-router-dom'

// Hooks
import { useFetch } from '../../hooks/useFetch'

// Styles
import './Recipe.styles.css'

export default function Recipe() {
  const { link } = useParams()

  let search = link.split('-')[0]

  console.log(search)

  const url = 'http://localhost:3000/recipes/' + search
  const { data:recipe, error, isPending } = useFetch(url)

  console.log(recipe)

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
