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
    <h1>Registration</h1>
    <form method="POST" use:enhance = {handleSubmit}>
        <label for="">Username</label><br>
        <input type="text" name="username">
        <label for="">Email</label><br>
        <input type="email" name="email">
        <label for="">Password</label><br>
        <input type="password" name="password1">
        <label for="">Confirm Password</label><br>
        <input type="password" name="password2">
        
        {#if error}
            <p>{error}</p><br>
        {/if}
        
        <button type="submit">login</button><br>
        <small>Already have an account? <a href="/auth/login">sign in</a></small>
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
        font-size: 800;
        font-weight: 900;
        color: rgba(224, 86, 86, 0.923);

    }
</style>