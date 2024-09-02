<script>
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import {goto} from '$app/navigation'
	import { onMount } from 'svelte';
    export let data

    const user = data?.user.username
    const winner = data?.result.winner.username
    const loser = data?.result.loser.username
    const match = data?.match


    $: loserCards = []
    onMount(async() =>{
        loserCards = data?.result.loser_card
    })


    const pickCard = async(cardId) => {
        await fetch(`http://127.0.0.1:8000/api/pick_card/${match}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({card_id: cardId})

        })

        // Redirect to a profile
        goto('/profile')

    }

    function playAgain(){
        goto('/game')
    }
    
</script>

<div class="result">
    {#if winner === user }
    <h1>{data?.result.message} {data?.user.username}🥂🥂</h1>
    <p>Opponent: <span>{data?.result.loser.username}</span></p>
    <span>Winning Card: {data?.result.winning_card[0].name}🔥</span>
   
    <div style="text-align: center;">
        <Button on:click={playAgain} type="danger">play again</Button>
    </div>
    
    {:else}
        <h1>{data?.result.message} {data?.user.username}😌😌</h1>
        <p>Opponent: <span>{data?.result.winner.username}</span></p>
        <span>Winning Card: {data?.result.winning_card[0].name}🔥</span>
        <Button on:click={playAgain} type="danger">play again</Button>
    {/if}
</div>
{#if user === winner}
<div class="loser-cards">
    <div class="inner">
        {#each loserCards as card }
            <Card {card}>
                <Button on:click={() => pickCard(card.id)}>Pick</Button>
            </Card>
        {/each}
    </div>
</div>
{/if}
<style>
    .result{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 50dvh;
    }
    h1{
        font-weight: 700;
        letter-spacing: 2px;
    }
    p{
        font-size: larger;
    }
    span{
        font-weight: 900;
        font-size: larger;
        letter-spacing: 1px;
        line-height: 2;
    }
    .loser-cards{
        display: flex;
        
        overflow-x: auto;
        gap: 1rem;
        padding: 1rem;
        scrollbar-width: thin;
    }
    .loser-cards::-webkit-scrollbar{
        height: 8px;
    }
    .loser-cards::-webkit-scrollbar-thumb{
        background-color: rgba(0,0,0,0.5);
        border-radius: 10px;

    }
    .loser-cards::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0.1);
    }
    .inner{
        display: flex;
    }
</style>