<script>
    import { onMount } from 'svelte';
    import Card from '../../../../lib/components/Card.svelte';
    import Button from '$lib/components/Button.svelte';
    import Pusher from 'pusher-js';
    import { PUBLIC_API_KEY } from '$env/static/public';

    export let data;

    let pusher, channel;
    let playerOne, playerTwo;

    $: match = data?.match;
    $: error = data?.error;
    $: player = data?.player[0];
    $: cards = [];
    $: user = data?.user.username;

    // Initialize player slots
    $: playerOneCard = null;
    $: playerTwoCard = null;
    $: playerOneHealth = 0;
    $: playerTwoHealth = 0;

    console.log(playerOneCard)
    console.log(playerTwoCard)
    onMount(async () => {
        // Fetch card details
        cards = await Promise.all(player.card.map(async (cardId) => {
            const res = await fetch(`http://127.0.0.1:8000/api/get_card/${cardId}`);
            return await res.json();
        }));

        // Fetch player details
        if (data?.player.length > 0) {
            playerOne = match.playerone; // first player
            playerTwo = match.playertwo;
        }


        // Fetch player details
        if (playerOne) {
            const response = await fetch(`http://127.0.0.1:8000/api/get_player?user_id=${match.player_one}`);
            const playerOneData = await response.json();
            playerOneHealth = playerOneData[0]?.hp;
        }

        if (playerTwo) {
            const response = await fetch(`http://127.0.0.1:8000/api/get_player?user_id=${match.player_two}`);
            const playerTwoData = await response.json();
            playerTwoHealth = playerTwoData[0]?.hp;
        }

        // Initialize Pusher and subscribe to 'match-channel'
        pusher = new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu',
        });

        channel = pusher.subscribe('match-channel');

        // Listen for 'get-card' event
        channel.bind('get-card', function(data) {
            console.log('New card available:', data);

            if (data.user === match.playerone) {
                playerOneCard = data.card;
                playerTwoHealth = data.player_two_health;
            } else if (data.user === match.playertwo) {
                playerTwoCard = data.card;
                playerOneHealth = data.player_one_health;
            }
        });
    });

    async function playCard(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/get_card/${id}`);
        const picked = await res.json();

        // Update the current player's card slot
        if (user === match.playerone) {
            playerOneCard = picked;
        } else if (user === match.playertwo) {
            playerTwoCard = picked;
        }

        // Trigger the event to update the opponent's display
        await fetch('http://127.0.0.1:8000/api/trigger_card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                card: picked.id,
                user: user,
                match: match.id,
            }),
        });

        // Game logic: Apply attack points
        if (picked.attack_point) {
            if (user === match.playerone) {
                playerTwoHealth -= picked.attack_point;
            } else if (user === match.playertwo) {
                playerOneHealth -= picked.attack_point;
            }
        }
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
        <div class="place-card">
            <span>
                <div class="player1">
                    <p>{match.playerone} - {playerOneHealth} hp</p>
                    {#if playerOneCard}
                        <Card card={playerOneCard} />
                    {:else}
                        <p>No Card Selected</p>
                    {/if}
                </div>
                <hr>
                <div class="player2">
                    <p>{match.playertwo} - {playerTwoHealth} hp</p>
                    {#if playerTwoCard}
                        <Card card={playerTwoCard} />
                    {:else}
                        <p>No Card Selected</p>
                    {/if}
                </div>
            </span>
        </div>

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
         font: inherit;
         height: 100dvh;
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
       
         flex-wrap: wrap;
         gap: 1rem;
         flex: 1;
         min-width: fit-content;
     }
     .button{
         display: flex ;
         justify-content: center;
         align-items: center;
         margin: 10px;
     }
     .place-card{
         margin-top: 20px;
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
     .player1, .player2 {
         padding: 20px;
     }
 </style>