<script>
    export let data

    $: match = data?.match
    $: error = data?.error
    $: console.log(match)
    // FIXME fi the redirect link
</script>

<div>
    {#if match.detail}
        <h2>{match.detail}🔥❌</h2>
        <p>Go back <a href="/">home 🏠</a></p>
    {:else} 
        {#if error}
            {error}
        {:else}
            <h1>{match.playerone} <small>vs</small> {match.playertwo}</h1>
        {/if}
    {/if}

    
</div>
<style>
    h1{
        text-transform: capitalize;
        font-weight: 700;
        letter-spacing: 1px;
    }
    small{
        text-transform: lowercase;
    }
    h2{
        text-align: center;
        margin: 100px 0;
        font-size: x-large;
        font-weight: 900;
        letter-spacing: -0.5px;
        line-height: 1;
    }
    p{
        text-align: center;
        font-weight: 800;
    }
</style>