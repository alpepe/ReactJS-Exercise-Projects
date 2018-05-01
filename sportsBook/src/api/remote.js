const host = 'http://localhost:8081/';

async function getAllMatches(){
    const res = await fetch (host + 'matches', {
        method: 'GET'
    })
    return await res.json();
}

export { getAllMatches };