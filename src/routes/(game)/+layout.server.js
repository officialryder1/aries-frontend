import { fail } from "@sveltejs/kit";

export async function load({fetch, locals}) {
    const user_id = locals.user.id
    
    const res = await fetch(`http://127.0.0.1:8000/api/get_player?user_id=${user_id}`)
    const player = await res.json()
    

    if(!res.ok){
        return fail(res.status, {
            error: player.detail || "Failed to get response"
        })
    }
    

    return{
        user: locals.user,
        player
    }
}