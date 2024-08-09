<script>
	import '../../app.css';
	import Navbar from "$lib/components/Header.svelte";

	import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation'
  	import "@fontsource/open-sans"


	export let data

	$: user = data?.user


	let links = [
		{ href: "/", name: "Home" },
		{ href: "/note", name: "Note"},
		{ href: "/auth/login", name: "Login" },
		{ href: "/auth/register", name: "Register" },
	]

	$: {
		if (user) {
			links = [
				{ href: "/", name: "Home" },
				{ href: "/note", name: "Note" },
				{ href: "/game", name: "Play Game"},
				{ href: "/api/logout", name: "Logout" },
				
			];
		}
	}
	
	onMount(async () =>{
		if(user){
			const interval = setInterval(() => {invalidateAll()}, 10000)

			return () => {
				clearInterval(interval)
			}
		}
        
    })

</script>
<Navbar {links} brandName="Arise" />

<div class="app">


	<main>
		<slot />
	</main>

	<footer>
		<p>Aries @2024 <a href="/">officialryder</a></p>
	</footer>
</div>

<style>
	:global(body) {
    	font-family: "Open Sans Variable", sans-serif;
  	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
