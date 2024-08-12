

export async function load({locals, fetch}) {
    const user = await locals.user
    const user_id = await user.id


    const res = await fetch(`http://127.0.0.1:8000/api/game/find_match?user_id=${user_id}`)

    const result = await res.json()
    

    return {
        user,
        result
    };
};