// axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(res => {
//         const deckId = res.data.deck_id
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
//     })
//     .then(res => {
//         const firstCard = res.data.cards[0]
//         console.log(`First card:${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`);
//         const deckId = res.data.deck_id;
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
//     })
//     .then(res => {
//         const secondCard = res.data.cards[0];
//         console.log(`Second card:${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`);
//     })
//     .catch(error => {
//         console.error('There was a problem with the request:', error);
//     });

document.addEventListener('DOMContentLoaded', () => {
    let deckId;

    function initializeDeck() {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                deckId = res.data.deck_id;
            })
            .catch(error => {
                console.error('Error creating a new deck:', error);
            });
    }

    function drawCard() {
        if (!deckId) {
            console.error('No deck ID found. Please initialize the deck first.');
            return;
        }
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                const cardContainer = document.querySelector('.card-container');

                if (response.data.cards.length > 0) {
                    const card = response.data.cards[0];
                    const cardElement = document.createElement('div');
                    cardElement.className = 'card';

                    const cardImage = document.createElement('img')
                    cardImage.src = card.image;
                    cardImage.alt = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`;
                    cardElement.appendChild(cardImage);

                    cardContainer.appendChild(cardElement);
                } else {
                    console.log('No cards left in the deck.');
                }
            })
            .catch(error => {
                console.error('Error drawing a card:', error);
            });
    }

    initializeDeck();

    document.querySelector('.draw-card-btn').addEventListener('click', drawCard);
})