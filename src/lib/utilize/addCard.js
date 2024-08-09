export function addCard(e){
    if(userCard.length == 0 || userCard.length < 5){
        userCard.push(e)
        console.log(userCard)
    } else{
        console.log("Card limit has been reached")
        console.log(userCard.length)
    }
    
}