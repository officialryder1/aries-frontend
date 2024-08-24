<script>
    import CharacterCard from '../../../lib/components/characterCard.svelte'
    import Card from '../../../lib/components/Card.svelte'
    import { characterStore } from '../../../lib/stores/characters.js'; 
  
    import { userCardStore } from '../../../lib/stores/userCard'
	import { onMount } from 'svelte';

    export let data;

    $: user = data?.user
    $: player = data?.player[0]
   
    $: cards = []

    $: avatar = []

    

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


 
    $: total = cards.reduce((acc, card) => {
        return acc + card.card_point
    }, 0)
    
    $: rank = ''
    $: {
        if(total <= 500){
            rank = 'D'
        } else if(total <= 500 && total < 200){
            rank = 'C'
        } else if(total <= 700){
            rank = 'B'
        } else if(total <= 1500){
            rank = 'A'
        } else if(total <= 3000){
            rank = 'S'
        }

    }
</script>

<header>
    <h1>Profile</h1>
<hr>

<h2 class="username">Username: {player.user_name}, Race: {player.character_name}</h2>
<p class="mana">{player.mana}mp | {player.hp}hp</p>
<p class="mana">{total} card points</p>
<h3 class="rank">rank: <b>{rank}</b> </h3>
</header>
<div class="card">
    {#if avatar.image }
        <CharacterCard avatarUrl={avatar.image} alt={avatar.name} name={avatar.name} description={avatar.description}/>
    {:else}
        <p>Loading character card...</p>
    {/if}
</div>
<h3>Your Card</h3><hr>
<div class="card-collection">
    
    {#each cards as card}
        <Card {card}/>
    {/each}
</div>
<style>
    h1{
        font-weight: 900;
        letter-spacing: 3px;
    }
    h1::after{
        content: '';
        border: 1px solid red;

    }
    .username{
        text-align: center;
        font-weight: 700;
        font-size: 2rem;
        letter-spacing: 2px;
        text-transform: capitalize;
    }
    .card{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h3{
        font-weight: 800;
        letter-spacing: 3px;
        line-height: 1px;
        font-size: 1rem;
    }
    .mana{
        text-align: center;
        letter-spacing: 2px;
        font-size: small;
        font-weight: 900;
    }
    .card-collection{
        display: flex;
        flex-wrap: wrap;
    }
    .rank{
        text-align: center;
        padding: 20px;
        font-weight: 800;
        line-height: -0.5;
    }
    b{
        font-weight: bolder;
        font-size: 2rem;
        line-height: 0.5;

    }
</style>