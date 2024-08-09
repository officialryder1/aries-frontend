<script>
    export let card;

    const getImageUrl = (path) => `http://127.0.0.1:8000${path}`

    const card_type = {
        1: 'mage',
        2: 'assassin',
        3: 'fighter',
        4: 'tank'
    }
    let type = ''
    function getType(cardType){
        if (cardType === 1){
            type = 'mage'
        }
        else if(cardType === 2){
            type = 'assassin'
        }
        else if(cardType === 3){
            type = 'fighter'
        }
        else if(cardType === 4){
            type = "tank"
        }
        else{
            type = ''
        }
    }
    let rarity = ''
    function getRarity(rare){
        if(rare === 1){
            rarity = 'S'
        } else if(rare === 2){
            rarity = 'A'
        } else if(rare === 3){
            rarity = 'B'
        } else if(rare === 4){
            rarity = 'C'
        } else if(rare === 5){
            rarity = 'D'
        }
    }
</script>

<div class="card">
    <img src="{getImageUrl(card.image)}" alt="{card.name}" />
    <h2>{card.name}</h2>
    <p>{card.description}</p>
    <ul>
        <p hidden>{getType(card.card_type), getRarity(card.rarity)}</p>
        <li>Card Point: {card.card_point}</li>
        <li>Card Type: {type}</li>
        <li>Attack Point: {card.attack_point}</li>
        <li>Defense Point: {card.defense_point}</li>
        <li>Rarity: {rarity}</li>
        <li>Mana Point: {card.mana_point}</li>
    </ul>
    <slot/>
</div>

<style>
    .card {
        border: 1px solid orangered;
        padding: 1rem;
        margin: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 200px;
        background-color: #06715F;
    }
    .card img {
        max-width: 100%;
        height: 100px;
    }
</style>
