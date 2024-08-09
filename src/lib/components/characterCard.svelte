<script>
    export let avatarUrl = '';
    export let name = 'Name';
    export let description = 'Description';


     const getImageUrl = (path) => `http://127.0.0.1:8000${path}`
</script>

<div class="card">
    <div class="avatar">
        <img src={getImageUrl(avatarUrl)} alt="{name}'s avatar" />
    </div>
    <div class="details">
        <h2>{name}</h2>
        <p>{description}</p>
    </div>
    <slot/>
</div>

<style>
   .card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: #c5cbcd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        max-width: 300px;
        width: 200px;
        margin: 1rem;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: translateY(-10px);
    }

    .avatar img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1rem;
    }

    .details h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 1px;
    }

    .details p {
        margin: 0.5rem 0 0;
        color: #666;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s, opacity 0.3s ease;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .card:hover .details p {
        visibility: visible;
        opacity: 1;
    }
    
</style>
