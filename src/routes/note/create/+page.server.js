import { fail, redirect } from '@sveltejs/kit';

import { isTokenExpired } from '../../../lib/utilize/tokenUtili.js';

const url = "http://127.0.0.1:8000/api/create_note"


export async function load({locals, cookies}) {
    const user = locals.user

    if(!user){
        throw redirect(302, '/api/logout')
    }

    const accessToken = cookies.get('access_token')


    if(isTokenExpired(accessToken)){
        cookies.delete('access_token', { path: '/' });
        cookies.delete('refresh_token', { path: '/' });
        throw redirect(302, '/api/logout');
    }
}
export const actions = {
    default: async ({locals, request}) => {

        const formData = await request.formData()

        const user = locals.user.id
        const text = formData.get('text')

        console.log(user)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, text})
            
        })
        

        const note = await res.json()

        console.log(note)
        if(!res.ok){
            return fail(res.status, {
                error: "Login Failed"
            })
        }
        
        
        
        throw redirect(302, '/note')

    }
};