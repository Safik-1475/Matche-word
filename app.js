const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// fetching data here
let information = [];
fetch(endpoint)
.then(info=>info.json())
.then(data=>information.push(...data));
// console.log(information);

// matches arrow function
const findMatchesData = (wordMatch,info) =>{
    // console.log(wordMatch);
    // console.log(info);

    // Here need to figure our if the city or state match what was the search user
    return info.filter(place=>{
        const regex = new RegExp(wordMatch,'gi');
        return place.city.match(regex) || place.state.match(regex);

    })
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

// display arrow function
function displayMatch(){
    const inputValue = this.value;
    // console.log(inputValue);
    const matchArr = findMatchesData(inputValue,information);
    // console.log(matchArr);
    const html = matchArr.map(place=>{
        const regex = new RegExp(inputValue, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${inputValue}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${inputValue}</span>`);

        return `
            <li>
                <span class"name">${cityName}, ${stateName}</span>
                <span class"population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}
//when user type then change event
searchInput.addEventListener("change",displayMatch);