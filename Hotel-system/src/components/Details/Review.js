import React from 'react';

export default function Review({ user, rating, comment, date }) {
    return (
        <div>
            <h1>{user}</h1>
            <p>created on: {date}</p>
            <h3>{rating} Stars</h3>
            <p>{comment}</p>
            
        </div>
    )
}