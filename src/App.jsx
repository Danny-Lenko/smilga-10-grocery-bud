import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { nanoid } from 'nanoid'

const restoreData = () => {
  const restoredData = localStorage.getItem('products')
  return restoredData
    ? JSON.parse(restoredData)
    : []
}

function App() {
  const [userInput, setUserInput] = useState('')
  const [products, setProducts] = useState(restoreData())
  const [editorOn, setEditorOn] = useState(false)
  const [currentProduct, setCurrentProduct] = useState('')
  const [editionState, setEditionState] = useState(null)
  const [alertDisplayed, setAlertDisplayed] = useState(false)

  function handleUserInput(e) {
    setUserInput(e.target.value)
  }

  function createProductsItem(name) {
    return({
      name: name,
      id: nanoid()
    })
  }

  function addProduct(e) {
    e.preventDefault()
    if (!userInput) return setEditionState('empty')

    setProducts(prevState => [...prevState, createProductsItem(userInput)])
    setUserInput('')
    setEditionState('add')
  }

  function editProduct(id) {
    const thisProduct = products.find(item => item.id === id)
    setCurrentProduct(thisProduct)
    setUserInput(thisProduct.name)
    setEditorOn(true)
  }

  function changeName(e) {
    e.preventDefault()
    if (!userInput) return setEditionState('empty')

    setProducts(prevState => prevState.map(product => (
      product.id === currentProduct.id
        ? {...product, name: userInput}
        : product
    )))
    setUserInput('')
    setEditionState('edit')
    setEditorOn(false)
  }

  function deleteProduct(id) {
    setProducts(prevState => prevState.filter(item => item.id !== id))
    if (!products[1]) return setEditionState('clear')
    setEditionState('remove')
  }

  function clearBud() {
    setProducts([])
    setEditionState('clear')
  }

  useEffect(() => {
    setAlertDisplayed(true)
    const timerId = setTimeout(() => {
      setAlertDisplayed(false)
      setEditionState(null)
    }, 2000)
    return () => clearTimeout(timerId)
  }, [editionState])

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])
  
  return(
    <section className="section-center">

      <div className="alert" 
        style={{visibility: `${alertDisplayed ? 'visible' : 'hidden'}`}}
      >
        <Alert
          editionState={editionState}
        />
      </div>

      <article className="grocery-form">
        <h3>grocery bud</h3>
        <form className="form-control"
          onSubmit={editorOn ? changeName : addProduct} 
        >
          <input className="grocery"
            type="text" 
            value={userInput}
            onChange={handleUserInput}
            placeholder="e.g. eggs"
          />
          <button className="submit-btn">
            {editorOn ? 'Edit' : 'Submit'}
          </button>
        </form>
      </article>

      <List 
        products={products}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />

      {
        products[0] && 
          <button className="clear-btn" onClick={clearBud}>
            Clear Items
          </button>
      }

    </section>
  )
}

export default App
