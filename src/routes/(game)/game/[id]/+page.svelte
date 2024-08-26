<script>
    import { onMount } from 'svelte';
    import Card from '../../../../lib/components/Card.svelte';
    import Button from '$lib/components/Button.svelte';
    export let data;

    $: match = data?.match;
    $: error = data?.error;
    $: player = data?.player[0];
    $: cards = [];
    $: avatar = [];
    $: user = data?.user.username

    onMount(async () => {
        // Fetch card details
        cards = await Promise.all(player.card.map(async (cardId) => {
            const res = await fetch(`http://127.0.0.1:8000/api/get_card/${cardId}`);
            return await res.json();
        }));

        // Fetch character details
        const res = await fetch(`http://127.0.0.1:8000/api/get_character/${player.character}`);
        avatar = await res.json();
    });

    $: pickedCard = null;
    $: cardItems = [];
    $: card = pickedCard
    $:{
        console.log(pickedCard)
        
    }


    async function playCard(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/get_card/${id}`);
        const picked = await res.json();
        cardItems = [...cardItems, picked];
        pickedCard = picked;
    }
</script>

<div class="body">
    {#if match.detail}
        <h2>{match.detail}🔥❌</h2>
        <p>Go back <a href="/">home 🏠</a></p>
    {:else if error}
        {error}
    {:else}
        <h1>{match.playerone} <small>vs</small> {match.playertwo}</h1>
        <br>
        <p>Place Card</p>
        {#if pickedCard}
            <div class="place-card">
                <span>
                    <div class="player1">
                        <p>{match.playerone}</p>
                        {#if match.playerone === user}
                            <Card {card} />
                        {/if}
                    </div>
                    <hr>
                    <div class="player2">
                        <p>{match.playertwo}</p>
                        {#if user === match.playertwo}
                            <Card {card} />
                        {/if}
                    </div>
                </span>
            </div>
        {:else}
            <p>Pick a card to play</p>
        {/if}
        <div class="player_deck">
            {#if cards.length > 0}
                {#each cards as card}
                    <Card {card}>
                        <span class="button">
                            <Button type="danger" on:click={() => playCard(card.id)}>Use</Button>
                        </span>
                    </Card>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
   .body{
        scrollbar-width: 10px;
    }
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
    .player_deck{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50dvh;
        flex-wrap: wrap;
        gap: 1rem;
        flex: 1;
        min-width: fit-content;;
        
    }
    .button{
        display: flex ;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }
    .place-card{
        height: 50dvh;
    }
    .place-card span{
        display: flex;

        justify-content: space-around;
        gap: 1px;
        margin: 20px;
        border-radius: 10px;
        min-height: 300px;
        box-shadow: gray 3px 5px 3px 3px;
        border-top: 1px solid grey;
    }
    .player1{
        padding: 20px;
    }
    .player2{
        padding: 20px;
    }
</style>
