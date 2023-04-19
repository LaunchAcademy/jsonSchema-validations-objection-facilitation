import React, { useState, useEffect } from "react"

const UnicornDetailsPage = (props) => {
    const [unicorn, setUnicorn] = useState({})

    const getUnicorn = async () => {
        const id = props.match.params.id
        const response = await fetch(`/api/v1/unicorns/${id}`)
        const parsedUnicornData = await response.json()
        setUnicorn(parsedUnicornData.unicorn)
    }

    useEffect(() => {
        getUnicorn()
    }, [])

    return (
        <div>
            <h1>Check out these sick unicorn stats</h1>

            <div className="details callout">
                <p>
                    Name: {unicorn.name}
                </p>
                <p>
                    Magic: {unicorn.magicalAbility}
                </p>
                <p>
                    Ability: {unicorn.age}
                </p>
            </div>
            
        </div>
    )
}

export default UnicornDetailsPage