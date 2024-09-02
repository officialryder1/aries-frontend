
export async function load({fetch, locals, params}) {
    
    const user = locals.user
    const match = params.id

    const res = await fetch('http://127.0.0.1:8000/api/match_result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user.username,
            match: match
        })
    })
    const result = await res.json()

    return {
        result,
        match
    };
};