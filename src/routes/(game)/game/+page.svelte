<script>
	import { goto } from '$app/navigation';
    import Button from '$lib/components/button.svelte'
    import {onMount} from 'svelte'

    export let data;

    $: user = data?.user.id
    $: request = []

    // $: console.log(request)


    let isLoading = false
    let showMatch = false
    let createMatch = false

    
    let message = ''

    async function findMatch(){
        isLoading = true
        createMatch = true
        showMatch = false

        // implement a api call logic here
        const res = await fetch(`http://127.0.0.1:8000/api/game/match_request?user_id=${user}`) 
        
        message = await res.json()

        setTimeout(() => {
            isLoading = false
            console.log("Match found")
            // implement logic for what happens after a match has be found.


        }, 10000);
    }



// i have created the api endpoint for requesting a match using api/game/request_match endpoints

    async function joinMatch(){
        isLoading = true
        showMatch = true
        createMatch = false

        setTimeout(() => {
            isLoading = false
            console.log("Match found")
            // implement logic for what happens after a match has be found.
            request = data?.result

        }, 1000);
        
    }

    $: console.log(request)

    async function acceptMatch(e){
        const res = await fetch(`http://127.0.0.1:8000/api/game/accept_match/?user_id=${user}&match=${e}`, {
            method: 'GET'
        })

        const response = await res.json()

        if(!response.ok){
            
            console.log(response)
        }
        goto('/')
       
    }

</script>

<div class="main">
    <div>
        <Button type="danger" on:click={findMatch}>Create a Match</Button>
        <Button on:click={joinMatch}>Join Match</Button>
    </div>
    
    <!-- fix this page to spin before displaying a match -->
    {#if isLoading}
        <p style="font-weight: 900; padding: 20px; letter-spacing: 2px;" class="spinner"></p>
       {#if createMatch}
            <p style="font-weight: 900; padding: 20px; letter-spacing: 2px;">{message.message}</p>
        {/if}
      
    {:else }
        <p >Find Match</p>
    {/if}

    {#if showMatch}
        {#if request }
            <p>Select match</p>
            {#each request as {requester_name, id} }
                <div class="match">
                    <h4>Match request by</h4>
                    <p>{requester_name}</p>
                    <p>{id}</p>
                    
                    <Button type="danger" on:click={() => acceptMatch(id)}>accept</Button>
                </div>
                {/each}
        {:else}
            <p>No match currently..</p>
        {/if}
    {/if}

   
</div> 

<style>
    .main{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    
        height: 100vh;
    }
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #fff;
        border-radius: 50%;
        width: 30px;
        height: 16px;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .match{
        border: 0.5px solid rgb(241, 236, 236);
        width: 300px;
        text-align: center;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
    }
    .match p{
        font-weight: 900;
        letter-spacing: 2px;
    }
</style>