import searchCountries from './core/searchCountries.js';
import debounce from './core/debounce.js';
import mapCountryResponse from './core/mapCountryResponse.js';
let controller = null;
const inputHolder = document.createElement('div');
inputHolder.className = 'input-holder';
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter your country...';
const resultElement = document.createElement('div');
const cardElement = document.createElement('div');
cardElement.className = 'card';
const fragment = document.createDocumentFragment();
export const preloadElement = createPreloader();
function cleanNode(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
function createPreloader() {
    const overlayPreload = document.createElement('div');
    overlayPreload.classList = 'overlay-preload overlay--hide';
    const preload = document.createElement('div');
    preload.className = 'preloader';
    overlayPreload.append(preload);
    return overlayPreload;
}
function renderCountryCard(card) {
    cleanNode(cardElement);
    const name = document.createElement('p');
    const capital = document.createElement('p');
    const region = document.createElement('p');
    const subregion = document.createElement('p');
    const population = document.createElement('p');
    const languages = document.createElement('p');
    const flag = document.createElement('img');
    name.textContent = `Name: ${card.name}`;
    if (card.capital)
        capital.textContent = `capital: ${card.capital}`;
    if (card.region)
        region.textContent = `region: ${card.region}`;
    if (card.subregion)
        subregion.textContent = `subregion: ${card.subregion}`;
    if (card.subregion)
        population.textContent = `population: ${card.population}`;
    if (card.languages.length > 0) {
        languages.textContent = 'languages: ';
        card.languages.forEach((lang) => (languages.textContent += `${lang.name}, `));
        languages.textContent = languages.textContent.slice(0, -2);
    }
    if (card.flags.png) {
        flag.src = card.flags.png;
        flag.alt = card.name;
    }
    cardElement.append(name, flag, capital, region, subregion, population, languages);
}
function getCountryCard(e, countries) {
    const target = e.target;
    if (!target.closest('.country'))
        return;
    cleanNode(resultElement);
    const countryElement = target.closest('.country');
    if (!countryElement)
        return;
    const countryId = Number(countryElement.dataset.countryId);
    if (!countries[countryId])
        return;
    const card = mapCountryResponse(countries[countryId]);
    renderCountryCard(card);
}
function renderCounriesList(countries) {
    if (countries.length === 0) {
        resultElement.textContent = 'Empty result...';
    }
    countries.forEach((country, id) => {
        const countryWrapp = document.createElement('div');
        countryWrapp.dataset.countryId = `${id}`;
        countryWrapp.className = 'country';
        const countryNameCapital = document.createElement('div');
        const nameElement = document.createElement('p');
        nameElement.textContent = country.name;
        const flagElement = document.createElement('img');
        flagElement.src = country.flags.png;
        flagElement.width = 150;
        flagElement.alt = country.name;
        const capitalElement = document.createElement('p');
        capitalElement.textContent = country.capital;
        const regionElement = document.createElement('p');
        regionElement.textContent = `Region: ${country.region}`;
        const populationElement = document.createElement('p');
        populationElement.textContent = `Population: ${country.population}`;
        countryNameCapital.append(nameElement, country.capital ? capitalElement : '', country.region ? regionElement : '', country.population ? populationElement : '');
        countryWrapp.append(flagElement, countryNameCapital);
        fragment.append(countryWrapp);
    });
    resultElement.append(fragment);
    resultElement.addEventListener('click', (e) => getCountryCard(e, countries));
}
function inputEventListener(e) {
    if (controller) {
        controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;
    cleanNode(resultElement);
    cleanNode(cardElement);
    const input = e.target;
    if (!input || input.value === '')
        return;
    if (preloadElement) {
        document.body.append(preloadElement);
    }
    searchCountries(input.value, signal)
        .then((countries) => renderCounriesList(countries))
        .catch((error) => {
        if (`${error}`.includes('Abort')) {
            return;
        }
    })
        .finally(() => {
        if (preloadElement) {
            preloadElement.remove();
        }
    });
}
const debounced = debounce((...args) => inputEventListener(args[0]));
input.addEventListener('input', debounced);
inputHolder.append(input);
document.body.append(inputHolder, resultElement, cardElement);
