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
    //add cards to populate name
    const breweryCardCollection = document.querySelector('#brewery-cards');
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('id', brewery.name)
    const h1 = document.createElement('h1');
    h1.textContent = brewery.name;
    //add brewery type so user can see what kind of brewery it is
    const type = document.createElement('h3');
    type.textContent = brewery.brewery_type
    //add image to make cards more engaging & appealing
    const img = document.createElement('img');
    img.src = 'https://icons-for-free.com/iconfiles/png/512/beer-131982518583696551.png'
    img.classList.add('card-img')
    //add address so user can easily find out where brewery is
    const street = document.createElement('h3');
    street.textContent = brewery.street
    //add button to save brewery in list (also basis for event listener 'click')
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.textContent = 'Visited'

    //append all elements to the div
    div.append(h1, type, img, street, btn);
    //append div to div in index.html
    breweryCardCollection.append(div);
}