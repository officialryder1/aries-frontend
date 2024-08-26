<script>
    import { onDestroy, onMount } from 'svelte';
    import { enhance } from '$app/forms'
    import { cards} from '../../../lib/stores/card'
    import { userCardStore } from '../../../lib/stores/userCard'
    import CharacterCard from '../../../lib/components/characterCard.svelte';
    import Card from '../../../lib/components/Card.svelte';
    import Button from '../../../lib/components/button.svelte'
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';


    export let data;

    console.log(data)
    let showCharacter = true;
    let showCard = false
    let userExist = false
    let error = ''

    let userCard = []
    $: character = data?.character
    let user = data?.user.id
   


    if(userCard.length === 5){
        userCardStore.update(array =>{
            return [...array, ...userCard]
        })
        
    }
    

    function toggleShow(){
    showCharacter = false
        showCard = true
    }

    onMount(async () =>{
        const res = await fetch('http://127.0.0.1:8000/api/cards')
        const data = await res.json()
        cards.set(data)
        console.log('mounted')

    })

    async function addCard(e){
        if(userCard.length == 0 || userCard.length < 5){
            userCard.push(e)
            console.log(userCard)
            if (userCard.length === 5) {
                userCardStore.update(array => {
                    return [...array, ...userCard]
                })
            }
        } else{
            console.log("Card limit has been reached")
            console.log(userCard.length)
        }
        
    }
    onDestroy(()=> {
        character = null
        // userCard = null
        console.log('Destroyed')
    })

    // $: {
    //     if (userCard.length === 5) {
    //         submitCards();
    //         console.log("Handled")
    //     }
    // }

    async function submitCards() {
        if (userCard.length === 5) {
            const res = await fetch(`http://127.0.0.1:8000/api/update_player?user_id=${user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    card: userCard
                })
            });

            const result = await res.json();
            
            if (res.ok) {
                console.log(result);
                goto('/profile')
            } else {
                console.error('Error submitting cards:', result);
            }
        }
    }
    
    
</script>

<div class="container">
    {#if showCharacter }
        <h1 class="head">Select Your Race.</h1>
        {#if character}
            <main>
                {#each character as {name, description, image, id} }
                    <CharacterCard avatarUrl={image} alt={name} name={name} description={description}>
                        <form method="POST" use:enhance={toggleShow}>
                            <input type="text" name="id" value="{id}" hidden>
                            <br><Button flat={true} inverse={true}>Select</Button>
                        </form>
                    </CharacterCard>
                {/each}
            </main>
        {:else}
            <p>No data to display</p>
        {/if}
    {/if}
    {#if showCard}
        <h1 class="head"> Pick Your Cards</h1>
        <p>( You can only select 5 cards for a start )</p>
        <div class="deck">
            {#each $cards as card  (card.id)}
                <Card {card}>
                    <Button type="danger" inverse={true} on:click={() => addCard(card.id)}>Pick</Button>
                </Card>
            {/each}
        </div>
        <button on:click={submitCards}>Submit</button>
    {/if}
</div>
<style>
    main {
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
     
    }
    .container {
        max-width: 1200px; /* Adjust as needed */
        margin: 0 auto;
        padding: 0 15px;
    }
    .head{
        font-weight: 900;
        letter-spacing: 3px;
    }
    p{
        text-align: center;
        font-weight: 400;
        letter-spacing: 1px;
        line-height: 0.5;
    }
    .deck{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
</style>