import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ products, deleteProduct, editProduct }) => {

  const allProducts = products.map(product => (
    <div className="grocery-item">
      <p className="title">{product.name}</p>

      <div>
        <FaEdit 
          className="edit-btn"
          onClick={ () => editProduct(product.id) } 
        />

        <FaTrash 
          className="delete-btn"
          onClick={ () => deleteProduct(product.id) }
        />
      </div>
    </div>
  ))
  
  return(
    <div className="grocery-container">
      {allProducts}
    </div>
  )
}

export default List
