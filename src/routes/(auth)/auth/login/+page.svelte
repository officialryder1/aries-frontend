<script>
    import { enhance } from '$app/forms'

    export let form;
    console.log(form)

    let error = ''
    const handleSubmit = async () =>{
        if(form?.error){
            error = form?.error || ' Check credentials'
        }
    }
</script>

<div>
    {#if error}
        <p>{error}</p>
    {/if}
    <h1>Login</h1>
 
    <form method="POST" use:enhance={handleSubmit}>
        <label for="">Username</label>
        <input type="text" name="username">
        
        <label for="">Password</label>
        <input type="password" name="password">

        <button type="submit">login</button><br>

        <small>Don't have an account? <a href="/auth/register">sign up</a></small>
    </form>
</div>
<style>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input{
        height: 40px;
        width: 350px;
        border: orangered 1px solid;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 10px;
        outline: none;
    }
    button {
        padding: 10px 20px;
        background-color: orangered;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    h1{
        font-weight: 900;
        text-shadow: 1px 2px orangered;
    }
    p{
        color: #fff;
        text-align: center;
        font-size: large;
        font-weight: 900;
        color: rgba(255, 0, 0, 0.743);
        
    }
    
</style>