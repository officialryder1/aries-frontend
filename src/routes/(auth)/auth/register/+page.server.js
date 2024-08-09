import { fail, redirect } from '@sveltejs/kit';

const url = "http://127.0.0.1:8000/api/register"

export const actions = {
    default: async ({request, locals}) => {
        const user = locals.user

        const formData = await request.formData()

        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password1')
        const password2 = formData.get('password2')

        if( password !== password2){
            return fail(400, {
                error: 'Password do not match'
            })
        }

        if( username === user){
            return fail(400, {
                error: "User already exist"
            })
        }

        if(!username || !email){
            return fail(400, {
                error: 'Fill out the rest'
            })
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        
        console.log({password, password2})

        const result = await res.json()
        console.log(result)
          //set cookies
        if(!res.ok){
            return fail(res.status, {
                error: result.username || "Login Failed"
            })
        }
        throw redirect(302, '/auth/login')
    }
};