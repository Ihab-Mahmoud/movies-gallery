import React from 'react'
import { Link } from 'react-router-dom'

const Error = () =>
{
    return (
        <>
        <h2>Something went wrong</h2>
        <Link to="/" >Back to Home </Link>
        </>
        
    )
}

export default Error