// Part 1
document.addEventListener("DOMContentLoaded", function () {

    div1 = document.getElementsByClassName("container")[0];
    div2 = document.getElementsByClassName("multiple-facts")[0];
    div3 = document.getElementsByClassName("fav-number-facts")[0];
    const numbers = [1, 2, 3, 4, 5];
    const favoriteNumber = 42;

    axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
        .then(response => {
            // console.log(`Fact about number ${favoriteNumber}: ${response.data.text}`);
            div1.innerHTML = `<p>Fact about number ${favoriteNumber}: ${response.data.text}</p>`;
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });


    axios.get(`http://numbersapi.com/${numbers.join(',')}?json`)
        .then(res => {
            const facts = Object.values(res.data);
            div2.innerHTML = facts.map(fact => `<p>${fact}</p>`).join('');
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });

    // axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
    //     .then(res => {
    //         console.log(`Fact about number ${favoriteNumber}: ${res.data.text}`)
    //         div3.innerHTML = `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;
    //         return axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
    //     })
    //     .then(res => {
    //         div3.innerHTML = `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;
    //         return axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
    //     })
    //     .then(res => {
    //         div3.innerHTML = `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;
    //         return axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
    //     })
    //     .then(res => {
    //         div3.innerHTML = `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;
    //         return axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the request:', error);
    //     });

    function getFact() {
        return axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
            .then(res => {
                div3.innerHTML += `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;
            })
    }

    getFact()
        .then(() => getFact())
        .then(() => getFact())
        .then(() => getFact())
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });

})

// Part 2


