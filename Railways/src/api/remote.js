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

async function getCatalog() {
    const res = await fetch(host + 'trips', {
        method: 'GET'
    })
    return await res.json();
}

async function getSearch(query) {
    const res = await fetch(host + 'search' + query, {
        method: 'GET'
    })
    return await res.json();
}

async function getTripDetails(id) {
    const res = await fetch(host + 'trips/' + id, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`
        }
    })
    return await res.json();
}

async function postReview(tripId, date, tripClass, count) {
    const res = await fetch(host + `cart`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tripId,
            date,
            class: tripClass,
            count
        })
    });
    return await res.json();
}

async function getCart() {
    const res = await fetch(host + 'cart', {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('authToken')}`
        }
    })
    return await res.json();
}



export { register, login, getCatalog, getSearch, getTripDetails, postReview, getCart };