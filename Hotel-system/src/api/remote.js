const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function createHotel(hotel) {
    const res = await fetch(host + 'hotels/create/', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    });
    return await res.json();
}

async function getHotels(page) {
    const res = await fetch(host + 'hotels/all?page=' + page)
    return await res.json();
}

async function getHotelDetails(id) {
    const res = await fetch(host + 'hotels/details/' + id, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`
        }
    })
    return await res.json();
}

async function postReview(hotelId, comment, rating) {
    const res = await fetch(host + `hotels/details/${hotelId}/reviews/create`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment,
            rating
        })
    });
    return await res.json();
}

async function getReviews(id) {
    const res = await fetch(host + `hotels/details/${id}/reviews` , {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`
        }
    });
    return await res.json();
}

//delete step 1/7
async function deleteHotel(id) {
    const res = await fetch(host + `hotels/${id}` , {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`
        }
    });
    return await res.json();
}



export { register, login, createHotel, getHotels, getHotelDetails, postReview, getReviews, deleteHotel };