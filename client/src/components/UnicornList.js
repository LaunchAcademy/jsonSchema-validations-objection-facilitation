import React, { useState, useEffect } from "react"

const UnicornList = () => {
    const [unicorns, setUnicorns] = useState([])

    const fetchUnicorns = async () => {
        const response = await fetch("/api/v1/unicorns")
        const parsedUnicornData = await response.json()
        setUnicorns(parsedUnicornData.unicorns)
    }

    useEffect(() => {
        fetchUnicorns()
    }, [])

    const unicornElements = unicorns.map((unicorn) => {
        return <li className="tile" key={unicorn.id}>{unicorn.name}</li>
    })

    return(
        <>
            <h1>Behold, The Most Powerful of Unicorns</h1>

            <ul className="details callout">
                {unicornElements}
            </ul>
        </>
    )
}

export default UnicornList