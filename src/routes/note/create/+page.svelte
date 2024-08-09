<script>
    import { enhance } from '$app/forms'
</script>

<form method="POST" use:enhance>
    <label for="">🖨️Note...</label>
    <textarea name="text" id=""></textarea>
    <button>submit</button>
</form>

<style>
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
    }
    label{
        padding: 15px;
        font-weight: 800;
        font-size: larger;
        letter-spacing: 3px;
    }
    textarea{
        width: 500px;
        height: 300px;
        text-align: center;
        padding: 20px;
        border: none;
        border-radius: 10px;
        outline: none;
        box-shadow: 1px 2px rgb(34, 34, 43);
    }
    button{
        margin: 10px;
        width: 540px;
        height: 40px;
        border-radius: 10px;
        background-color: #06715f;
        color: white;
        font-weight: 800;
        letter-spacing: 3px;

    }
</style>