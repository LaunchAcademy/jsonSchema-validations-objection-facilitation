import React, { useState } from "react";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";

import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./ErrorList"

const UnicornForm = props => {
  const [newUnicorn, setNewUnicorn] = useState({
    name: "",
    age: "",
    magicalAbility: ""
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = event => {
    setNewUnicorn({
      ...newUnicorn,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const addUnicorn = async () => {
    try {
      const response = await fetch("api/v1/unicorns", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newUnicorn)
      })
      // error handling 
      if (!response.ok) {
        if(response.status == 422) {

          // rendering the errors
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }

      } else {
        // HAPPY PATH
        const body = await response.json()
        console.log("We did it! The new unicorn is:")
        console.log(body)
        clearForm()
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
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

export default hot(UnicornForm);
