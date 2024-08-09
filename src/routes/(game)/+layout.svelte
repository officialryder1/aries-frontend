<script>
    import '../../app.css'
</script>

<div class="app">
    <main class="container">
        <div class="nav"><a href="/profile">Profile</a></div>
        <slot/>
    </main>
</div>

<style>
    .app{
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
    }
    *, *::before, *::after {
        box-sizing: border-box;
    }
    .container {
        max-width: 1200px; /* Adjust as needed */
        margin: 0 auto;
        padding: 0 15px;
    }
    @media (max-width: 1200px) {
    .container {
            padding: 0 10px;
        }
    }

    @media (max-width: 768px) {
        .container {
            padding: 0 5px;
        }
    }
    .nav{
        margin-top: 10px;
        font-weight: 900;
        letter-spacing: 2px;
        font-size: 1.4rem;
        border: 1px solid orangered;
        width: 170px;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
        background-color: black
    }
    .nav:hover{
        background-color: white;
        color:#fff;
    }
</style>