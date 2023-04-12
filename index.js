const form = document.querySelector('.search-by-city');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('event:', event);
    const searchResult = document.querySelector('#search').value
    const citySplit = searchResult.split(' ')
    const city = citySplit.join('_')
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=100`)
    .then(response => response.json())
    .then(response => {
        console.log('response:', response)
        const breweryCards = document.querySelector('#brewery-cards')
        breweryCards.innerHTML = ''
        response.forEach(brewery => showBrewery(brewery));
    })
})

function showBrewery(brewery){
    //adds cards that populate with brewery name
    const breweryCardCollection = document.querySelector('#brewery-cards');
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('id', brewery.name)
    const h1 = document.createElement('h1');
    h1.textContent = brewery.name;
    const type = document.createElement('h3');
    type.textContent = brewery.brewery_type
    const img = document.createElement('img');
    img.src = 'https://icons-for-free.com/iconfiles/png/512/beer-131982518583696551.png'
    img.classList.add('card-img')
    const street = document.createElement('h3');
    street.textContent = brewery.street

    div.append(h1, type, street, img);
    breweryCardCollection.append(div);
}