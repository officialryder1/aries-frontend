import { redirect } from '@sveltejs/kit';
import { notesStore } from '../../lib/stores/notes.js';

import { isTokenExpired } from '../../lib/utilize/tokenUtili.js';

const ssr = true


export const load = async ({fetch, locals, cookies}) => {

    const accessToken = cookies.get('access_token')


    if(isTokenExpired(accessToken)){
        cookies.delete('access_token', { path: '/' });
        cookies.delete('refresh_token', { path: '/' });
        throw redirect(302, '/api/logout');
    }
    
    const user = locals.user

    if(!user){
        throw redirect(302, '/api/logout')
    }

    try{
        const res = await fetch('api/note')
        
        if(res.status === 401){
            
            throw redirect(302, '/api/logout')
        }

        if(!res.ok){
           
            throw redirect(302, '/auth/logout')
            
        }
        const note = await res.json()
        notesStore.set(note)

    
        
        return{
            user,
            note
        }
    }catch(error){
        console.error('Error fetching notes:', error);
        // You can add more sophisticated error handling here
        return {
            user,
            note: null,
            error: 'Failed to fetch notes',
            redirect: '/'
        };
    }
}

