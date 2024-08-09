<script>
    export let links = [];
    export let brandName = "MySite";
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };
</script>

<nav class="navbar">
    <div class="navbar-brand">
        <a href="/" class="navbar-item">{brandName}</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="navbar-burger" on:click={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    <div class={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
        <div class="navbar-end">
            {#each links as { href, name }}
                <a href={href} class="navbar-item">{name}</a>
            {/each}
        </div>
    </div>
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #06715f;
        color: white;
        border-bottom: 1px solid orangered;
    }

    .navbar-brand .navbar-item {
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }

    .navbar-burger {
        display: none;
        flex-direction: column;
        cursor: pointer;
    }

    .navbar-burger span {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 2px 0;
    }

    .navbar-menu {
        display: flex;
    }

    .navbar-menu.is-active {
        display: block;
    }

    .navbar-end .navbar-item {
        padding: 0.5rem 1rem;
        color: white;
        text-decoration: none;
    }

    .navbar-end .navbar-item:hover {
        background-color: orangered;
    }

    @media (max-width: 768px) {
        .navbar-burger {
            display: flex;
        }

        .navbar-menu {
            display: none;
            flex-direction: column;
            width: 100%;
        }

        .navbar-menu.is-active {
            display: flex;
        }

        .navbar-end .navbar-item {
            width: 100%;
            text-align: center;
        }
    }
</style>
