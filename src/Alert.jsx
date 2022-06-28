import React from 'react'

const Alert = ({editionState}) => {

   function renderAlertMsg() {
      if (editionState === "add") {
         return 'Item Added To The List'
      }
      if (editionState === "edit") {
         return 'Value Changed'
      }
      if (editionState === "empty") {
         return 'Please Enter Value'
      }
      if (editionState === "remove") {
         return 'Item Removed'
      }
      if (editionState === "clear") {
         return 'Empty List'
      }
      return ''
   }
  
   function determineClassName() {
      if (editionState === "add" 
            || editionState === "edit") {
         return 'alert-success'
      }
      if (editionState === "empty" 
            || editionState === "remove" 
            || editionState === "clear") {
         return 'alert-danger'
      }
      return ''
   }

  return(
    <div className={ determineClassName() }>
       { renderAlertMsg() }
    </div>
  )
}

export default Alert
