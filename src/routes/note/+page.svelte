<script>
	import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation'
    import { slide, fade, scale } from 'svelte/transition';
    import {flip} from 'svelte/animate'
    

    export let data

    $: notes = data?.note
  

    async function deleteNote(id){
        const res = await fetch(`http://127.0.0.1:8000/api/delete_note/${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            notes = notes.filter(note => note.id !== id)
        }
    }
</script>

<div>
    <a href="/" class="add">👈back</a>
    <a href="/note/create" class="add">➕🖨️</a>
</div>
<div in:scale out:slide>
   {#if notes.length > 0}
    {#each notes as note (note.id) }
            <span animate:flip={{duration: 500}}>
                <p style="padding: 10px;">{note.text}</p>
              
                <button type="button" on:click|preventDefault={deleteNote(note.id)}> ❌ </button>
                
            </span>
        {/each}
   {:else}
        <span>
            <p>You have not written any note</p>
        </span>
   {/if}
</div>
<style>
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        
        flex-wrap: wrap;
        padding: 10px;
        margin: 10px;
    }

    span{
        padding: 10px;
        margin: 10px;
        min-height: 80px;
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #1f232b;
        color: #fff;
        position: relative;
    }

    span::after, span::before{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: conic-gradient(#ff4545, #00ff99, #006aff, #ff0095, #ff4545);
        z-index: -1;
        padding: 5px;
        border-radius: 10px;
    }

    span::before{
        filter: blur(1.5rem);
        opacity: 0.5;
    }
    p{
        font-weight: 900;
        letter-spacing: 0.5px;
        text-shadow: 1px 2px orangered;
    }
    .add{
        width: 100px;
        border: 1px solid orangered;
        text-align: center;
        height: 25px;
        display: block;
        margin: 0 auto;
        padding: 10px;
        border-radius: 10px;
        background-color: #1f232b;
        text-decoration: none;
        margin-top: 10px;
    }
    .add:hover{
        background-color: #2e3441;
    }


</style>