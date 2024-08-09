import { characterStore } from '../../../lib/stores/characters.js';
import { redirect, fail } from '@sveltejs/kit';
import { userCardStore } from '../../../lib/stores/userCard.js';



export async function load({fetch, locals}) {

    const res = await fetch('api/characters')
    const data = await res.json()

    characterStore.set(data)
    
    return {
        character:data,
        user:locals.user,
    };
};
 
export const actions = {
    default: async ({request, locals}) => {
        console.log(locals)
        const user = locals.user.id
        const formData = await request.formData()

        const character = await formData.get('id')

        const response = await fetch('http://127.0.0.1:8000/api/create_avatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, character})
        })

        const player = await response.json()
        
        

        
        
        if(!response.ok){
            return fail(response.status, {
                error: "Failed"
            })
        }
        
        
        locals.player = await player
        throw redirect(302, '/create_avatar')
        
    }
};