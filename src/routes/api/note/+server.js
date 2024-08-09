import { redirect } from '@sveltejs/kit';

const url = 'http://127.0.0.1:8000/api/notes'

export async function GET({cookies}) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access_token')}`
        }
    })
    
 

    return new Response(response.body);
};