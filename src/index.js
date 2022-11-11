import './css/styles.css';
import debounce from "lodash.debounce";

import { fetchCountries } from "./fetchCountries";
export { buildCardCountry, clearAll }

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('input[id="search-box"]'),
    listCountryEl: document.querySelector('.country-list'),
    infoCountryEl: document.querySelector('.country-info'),
}

let descCountry = {};
refs.inputEl.addEventListener('input', debounce(delayFindCountry, DEBOUNCE_DELAY))

function delayFindCountry(evt) {
    descCountry['name'] = evt.target.value.trim()
    if (!descCountry.name) {
        refs.listCountryEl.innerHTML = '';
        refs.infoCountryEl.innerHTML = '';
        return
    }
    fetchCountries(descCountry)
}

function buildCardCountry(country) {
    if (country.length !== 1) {
        refs.infoCountryEl.innerHTML = ''
        refs.listCountryEl.innerHTML = country.map(makeListCountries).join('');
        return
    }
    const nameLanguages = country[0].languages.map(language => language.name)
    refs.listCountryEl.innerHTML = '';
    refs.infoCountryEl.innerHTML =
        `<div style="display: flex; gap: 10px; align-items: center;">
            <img style="width:${100}px; height:${100}px;" src="${country[0].flags.svg}" alt="flag"/>
            <p style="font-size: 36px; font-weight: 700;">${country[0].name}</p>
        </div>
        <p style="font-size: 18px; font-weight: 700;">Capital:<span style="margin-left: 5px; font-weight: 400;">${country[0].capital}</span></p>
        <p style="font-size: 18px; font-weight: 700;">Population:<span style="margin-left: 5px; font-weight: 400;">${country[0].population}</span></p>
        <p style="font-size: 18px; font-weight: 700;">Languages:<span style="margin-left: 5px; font-weight: 400;">${nameLanguages}</span></p>`
}


function makeListCountries(country) {
    return `<li style="display: flex; gap:3px; align-items: center; margin: 5px;">
    <img style="width:${30}px; height:${30}px;" src="${country.flags.svg}" alt="flag" class="img"/>
    <p style="font-weight: 500; margin: 0;">${country.name}</p>
    </li>`
}

function clearAll() {
    refs.listCountryEl.innerHTML = '';
    refs.infoCountryEl.innerHTML = '';
}
