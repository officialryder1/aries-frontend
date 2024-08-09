<script>
    import { onDestroy, onMount } from 'svelte';
    export let data

    let app = 'Arise'

    let user = data?.user

   

</script>

<main>
    <h1>{app} website</h1>
    
    

    <div class="card">
        {#if user}
            <h1>Welcome, {user.username}</h1>
        {:else}
            <h1>Welcome, Anonymous</h1>

        {/if}
    </div>

    
</main>
<style>
    h1{
        font-weight: 700;
        letter-spacing: 3px;
    }
    .card{
        margin: 0 auto;
        padding: 2em;
        width: 300px;
        background-color: #1c1f2b;
        text-align: center;
        border: 10px;
        position: relative;
    }

    @property --angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }
    .card::after, .card::before{
        --angle: 0deg;
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: conic-gradient(from var(--angle), transparent 70%, blue, red, orangered, pink);
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        z-index: -1;
        padding: 4px;
        border-radius: 10px;
        animation: 3s spin linear infinite;
    }

    .card::before{
        filter: blur(1.5rem);
        opacity: 1;
    }
    @keyframes spin{
        from{
            --angle:0deg;
        }
        to{
            --angle: 360deg
        }
    }

</style>