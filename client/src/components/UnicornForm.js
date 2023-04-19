import React, { useState } from "react";
import { Redirect } from "react-router-dom"

import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./ErrorList"

// build out the post fetch 
// receive the happy path in the backend
// test sending data without validations 
// add validations to model, and review migration constraints 
// handle new errors in backend
// serve up to here and use translateServerErrors to display in the form

const UnicornForm = props => {
  
  const [newUnicorn, setNewUnicorn] = useState({
    name: "",
    age: "",
    magicalAbility: ""
  })

  const [errors, setErrors] = useState({})

  const [redirectData, setRedirectData] = useState({
    shouldRedirect: false,
    id: null
  })

  if (redirectData.shouldRedirect) {
    return <Redirect to={`/unicorns/${redirectData.id}`} />
  }

  const handleInputChange = event => {
    setNewUnicorn({
      ...newUnicorn,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const addUnicorn = async () => {
    try {
      const response = await fetch("/api/v1/unicorns", {
        method: "POST",
        body: JSON.stringify(newUnicorn),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })

      const parsedResponse = await response.json()

      if (response.ok) {
        // HAPPY PATH
        setRedirectData({ shouldRedirect: true, id: parsedResponse.newUnicorn.id })
        
      } else {
        // SAD PATH
        if (response.status === 422){
          const translatedErrors = translateServerErrors(parsedResponse.errors)
          setErrors(translatedErrors)
        }
      }

  // ............

    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    // we could check for the required fields here as well, and then wouldnt encounter DB errors. But we want to ensure our swiss cheese model
    // is properly redundant 

    addUnicorn()
  }

  const clearForm = () => {
    setNewUnicorn({
      name: "",
      age: "",
      magicalAbility: ""
    })
    setErrors({})
  }

  return (
    <>
      <h1>New Unicorn Form</h1>
      <form onSubmit={handleSubmit} className="callout" >
        <ErrorList errors={errors} />

        <label>
         Name:
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newUnicorn.name}
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            name="age"
            onChange={handleInputChange}
            value={newUnicorn.age}
          />
        </label>

        <label>
          Magical Ability
          <input
            type="text"
            name="magicalAbility"
            onChange={handleInputChange}
            value={newUnicorn.magicalAbility}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Track Unicorn" />
        </div>
      </form>
    </>
  )
}

export default UnicornForm;









    // const unicornData = await response.json()
      // if (response.ok) {
      //   console.log(newUnicorn)
      //   // setRedirectData({ shouldRedirect: true, id: unicornData.newUnicorn.id })
      // } else {
      //   if (response.status === 422) {
      //     const newErrors = translateServerErrors(unicornData.errors)
      //   } else {
      //     console.log("you bad")
      //   }
      // }