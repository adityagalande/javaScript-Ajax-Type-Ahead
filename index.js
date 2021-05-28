const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint).then(blob => {
  return blob.json();
}).then(data => cities.push(...data));

function findMatches(wordToMatch, cities){

  return cities.filter(place => {
    const regexp = new RegExp(wordToMatch, 'gi');
    return place.city.match(regexp) || place.state.match(regexp);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    return `<li>
              <span class="name">${place.city}, ${place.state}</span>
              <span class="population">${numberWithCommas(place.population)}</span>
            </li>`;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
