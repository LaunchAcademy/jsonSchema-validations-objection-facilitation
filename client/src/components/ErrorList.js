import React from "react"

const ErrorList = props => {

        // const errors = {
        //   name: "is a required property",
        //   magicalAbility: "must be a string"
        // }


  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map(field => {
      index++
      return (
        <li key={index}>
          {field}: {props.errors[field]}
        </li>
      )
    })
    return (
      <div className="callout alert">
        <ul>{listItems}</ul>
      </div>
    )
  } else {
    return ""
  }
}

export default ErrorList
