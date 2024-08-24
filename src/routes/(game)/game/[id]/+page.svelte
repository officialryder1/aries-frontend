<script>
    import { onMount } from 'svelte';
    import Card from '../../../../lib/components/Card.svelte';
    import Button from '$lib/components/Button.svelte';
    export let data

    $: match = data?.match
    $: error = data?.error
    $: console.log(match)
    $: player = data?.player[0]
    $: cards = []
    $: avatar = []

    // $: {
    //     console.log(player)
    //     console.log(cards)
    //     console.log(avatar)
    // }

    
    onMount(async() =>{
        const cardDetail = await Promise.all(player.card.map(async (cardId) => {
            const res = await fetch(`http://127.0.0.1:8000/api/get_card/${cardId}`)
            const card = await res.json()
            return card;
        }))

        const characterDetail = async() =>{
            const chara = await fetch(`http://127.0.0.1:8000/api/get_character/${player.character}`)
            const result = await chara.json()
            return result;
        }
        avatar = await characterDetail()
        cards = cardDetail
    })
    
    // Logic to show card in the card dashboard
    $: card_pick = []
    $: picked = []
    $: card =[]
    $: showPick = false
   
    
    async function playCard(id){
        showPick = true
        const res = await fetch(`http://127.0.0.1:8000/api/get_card/${id}`)
        picked = await res.json()
        card.push(picked)
        return picked
    }
    
    $: console.log(card_pick)
    $: console.log(picked)
</script>

<div>
    {#if match.detail}
        <h2>{match.detail}🔥❌</h2>
        <p>Go back <a href="/">home 🏠</a></p>
    {:else} 
        {#if error}
            {error}
        {:else}
            <h1>{match.playerone} <small>vs</small> {match.playertwo}</h1><br>
            <div class="place-card">
                <p>Place Card</p>
                <span>
                    <div class="player1">
                        <p>{match.playerone}</p>
                        {#if showPick}
                            <Card {card}/>
                        {/if}
                    </div>
                    <hr>
                    <div class="player2">
                        <p>{match.playertwo}</p>
                        
                    </div>
                </span>
            </div>
            <p>pick a card to play</p>
            <div class="player_deck">
                
                {#each cards as card }
                    <Card {card}>
                        <span class="button">
                            <Button type="danger" on:click={() => playCard(card.id)}>use</Button>
                        </span>
                    </Card>
                {/each}
            </div>
        {/if}
    {/if}

    
</div>
<style>
    div{
        overflow: hidden;
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