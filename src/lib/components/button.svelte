<script>
    export let type = 'primary';
    export let flat = false;
    export let inverse = false;

    // all this variable will be responsible for how the button will display when called
</script>

<!-- the on:click will make this button clickable -->
<button type="submit" class="{type}" class:flat={flat} class:inverse={inverse} on:click>
    <slot></slot>
</button>

<style>
    button{
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: bold;
        box-sizing: 1px 2px 3px rgba(0,0,0,0.2);
        letter-spacing: 1px;
    }
    .primary{
        background: rgb(33 163 154);
        color: #fff;
    }
    .secondary{
        background-color: rgb(60 188 60);
        color: #fff;
    }
    .danger{
        background: #d91b42;
        color: #fff;
    }
    .flat{
        box-shadow: none;
    }
    .primary.inverse{
        color: rgb(33 163 154);
        background-color: #fff;
        border: 2px solid rgb(33 163 154);
        transition: 0.5s ease;
    }
    .primary:hover{
        background-color: rgb(33 163 154);
        color: #fff;
        
       
    }
    .secondary.inverse{
        color:rgb(60 188 60);
        background-color: #fff;
        border: 2px solid rgb(60 188 60);
        transition: 0.5s ease;
    }
    .danger.inverse{
        color: #d91b42;
        background-color: #fff;
        border: 2px solid #d91b42;
        transition: 0.5s ease;
    }
    .danger:hover{
        background-color: #d91b42;
        color: #fff;
    }
</style>