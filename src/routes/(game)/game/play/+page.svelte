<script>
	import Button from "../../../../lib/components/button.svelte";

    let card = [
        {'id': 1, "name": 'victor'},
        {'id': 2, 'name': 'Benjamin'},
        {'id': 3, 'name': 'Benjamin'},
        {'id': 4, 'name': 'Benjamin'},
        {'id': 5, 'name': 'Benjamin'}
    ]
  
    $: selected = []
    function addCard(id){
        selected.push(id)
    }

    $: console.log(selected)
    
</script>

<div>
    <h1>start game</h1>

    <div class="deck-of-cards">
        <p>Enter card</p>

        <span class="card-placement">
            {#if selected.length != 0}  
                <span style="color: black;">
                    <p>hello {selected}</p>
                    
                </span>
            {:else}
                <p>Place your Card</p>
            {/if}
            
        </span>

        <p class="cards">
        {#each card as {name, id}}
            <span>
                card {name}

                <Button type="danger" on:click={() => addCard(id)}>pick</Button>
            </span>
        {/each}
     
    </div>
</div>

<style>
    h1{
        text-transform: capitalize;
        font-weight: 700;
        letter-spacing: 2px;
    }
        
    .deck-of-cards{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 50vh;
    }
    .cards{
        display: flex;

    }
    .cards span{
        padding: 30px;
        border: 1px solid orangered;
        margin: 10px;
        min-height: 100px;
        width: 70px;
        text-align: center;
        border-radius: 5px;
    }
    .card-placement{
        min-height: 200px;
        min-width: 250px;
        border: 1px solid white;
        background-color: #fff;
        border-radius: 10px;

        color: rgb(143, 155, 156);
        text-align: center;
    }
    .card-placement p{
        font-weight: 600;
        letter-spacing: 2px;
        margin: 80px auto;
    
    }
  
</style>