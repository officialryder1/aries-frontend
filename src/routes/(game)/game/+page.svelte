<script>
	import { goto } from '$app/navigation';
    import Button from '$lib/components/button.svelte'
    import {onMount, onDestroy} from 'svelte'
    import Pusher from 'pusher-js';
    import {PUBLIC_API_KEY} from '$env/static/public'

    export let data;

    $: user = data?.user.id
    $: request = []
    $: url = ""

    // $: console.log(request)


    let isLoading = false
    let showMatch = false
    let createMatch = false

    
    $: matchAccepted = false
    $: availableMatch = availableMatch || []
    
    
    $: console.log(availableMatch)
    
    let message = ''

    let pusher, channel;


    async function findMatch(){
        isLoading = true
        showMatch = false

        

        // implement a api call logic here
        const res = await fetch(`http://127.0.0.1:8000/api/game/match_request?user_id=${user}`) 
        
        message = await res.json()

        createMatch = true
        setTimeout(() => {
            isLoading = false
            console.log("Match found")
            // implement logic for what happens after a match has be found.


        }, 10000);
    }


// i have created the api endpoint for requesting a match using api/game/request_match endpoints

    onMount(()=> {
        pusher = new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu',
        });

        channel = pusher.subscribe('match-channel')

        //listen for new event
        channel.bind("new-match", function(data) {
            console.log("new Match available", data)

            availableMatch = [...availableMatch, {
                requester_name: data.requester_name,
                id: data.match_request_id
            }]
        })
        fetchExistingMatches();
    })

    async function fetchExistingMatches() {
        const res = await fetch(`http://127.0.0.1:8000/api/game/pending_matches?user_id=${user}`);
        const result = await res.json();
        availableMatch = result.matches;
    }

    async function joinMatch(){
        isLoading = true
        showMatch = true
        createMatch = false

        setTimeout(async () => {
            isLoading = false
            console.log("Match found")
            // implement logic for what happens after a match has be found.

        }, 1000);
        if (Array.isArray(data?.result)) {
            data.result.forEach(match => {
                availableMatch = [...availableMatch, {
                    requester_name: match.requester_name,
                    id: match.id
                }];
            });
        } else if (data?.result) { 
            // In case data.result is a single match object
            availableMatch = [...availableMatch, {
                requester_name: data.result.requester_name,
                id: data.result.id
            }];
        }
        
    }

    

    async function acceptMatch(e){
        const res = await fetch(`http://127.0.0.1:8000/api/game/accept_match/${e}/?user_id=${user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(res.ok){
            const data = await res.json()

            url = data.redirect_url
            const id = url.split('/').pop()
            matchAccepted = true
            

            goto(`/game/${id}`)
            createMatch = true
            // window.location.href = data.redirect_url
        } else{
            console.error("Error accepting match", res.statusText)
            console.log(e)
        }

       
    }

    // Polling mechanism to check if a match is accepted
    // accept match pusher call
	onMount(() => {
        pusher = new Pusher(PUBLIC_API_KEY, {
            cluster: 'eu',
        });

        // Subscribe to the Pusher channel
        channel = pusher.subscribe('match-channel');

        // Listen for match acceptance event
        channel.bind('match-accepted', function(data){
            console.log('Match accepted:', data);
            
            // Redirect only if the current user is one of the players
            if (data.match_id && (data.player_one_id === user || data.player_two_id === user)) {
                url = data?.redirect_url;
                console.log(`Redirecting to ${url}`)
                goto(data.redirect_url);
            }
            
        });

      
    });

    
    
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

    	<!-- Show Available Matches -->
    {#if showMatch}
        {#if availableMatch.length > 0}
            <p>Select match</p>
            {#each availableMatch as {requester_name, id} }
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

    <!-- Redirect to Match -->
    {#if matchAccepted}
    <a href={url}>Enter match</a>
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