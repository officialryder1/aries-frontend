import { isTokenExpired } from '../../lib/utilize/tokenUtili'
import { redirect } from '@sveltejs/kit'

export const ssr = true
export const csr = true
export async function load({locals, cookies}) {
    const user = locals.user
    // const accessToken = cookies.get('access_token')
    // if(isTokenExpired(accessToken)){
    //     cookies.delete('access_token', { path: '/' });
    //     cookies.delete('refresh_token', { path: '/' });
    //     throw redirect(302, '/api/logout');
    // }


    return {
        user
    };


    
}