const inputBlock = document.querySelector('.input');
const errorBlock = document.querySelector('.error');
const outputBlock = document.querySelector('.output');
const checkboxChecked = document.getElementById('checkbox');

let dataToAPI = [];
let inputValue = '';

// create work/sorted array (need to sort)

let workArr = [];

// Get change input value

document.oninput = function changeInput() {
    inputValue = inputBlock.value;
}

// API data retrieval

async function getJSONAsync(url) {
    let response = await fetch("https://cors-anywhere.herokuapp.com/" + url);
    if (response.ok) {
        dataToAPI = await response.json();
        return dataToAPI;
    }
    else throw new Error(`${response.status}: ${response.statusText}`);
}

async function getData() {
    let url = "https://www.mrsoft.by/data.json";
    await getJSONAsync(url);
}

getData();

// auxiliary unit cleaning functions

function showError() {
    const errorMessage = 'Incorrect input, no data can be displayed';
    errorBlock.innerHTML = errorMessage;
    setTimeout(clearError, 1000);
}

function clearError() {
    errorBlock.innerHTML = '';
}

function clearInput() {
    inputBlock.value = '';
    inputValue = '';
}

function clearOutput() {
    outputBlock.innerHTML = '';
}

function checkToInputError() {
    if(!inputValue) {
        clearOutput();
        showError()
    }
}

// function to output data by number

function inferenceByNumber() {
    dataToAPI.data.forEach(element => {
        if(element.length > inputValue) workArr.push(element)
    });
    createElement();
}

// function to output data by string

function inferenceByString() {
    dataToAPI.data.forEach(element => {
        if(!checkboxChecked.checked) {
            if(element.toLowerCase().includes(inputValue.toLowerCase())) workArr.push(element);
        } else {
            if (element.includes(inputValue)) workArr.push(element);
        }
    });
    createElement();
}

// create word element

function createElement() {
    clearOutput();
    if(workArr.length) {
        workArr.map(item => outputBlock.insertAdjacentHTML('beforeend', `<span class="word">${item}</span>`));
        workArr = [];
    } else {
        showError();
    }
}

// create hundler function

document.addEventListener('click', event => {
    let target = event.target;
    switch (target.id) {
        case 'number':
            checkToInputError();
            if(inputValue) inferenceByNumber();
            clearInput();
            break;
        case 'string':
            checkToInputError();
            if (inputValue) inferenceByString();
            clearInput();
            break;
        default:
    }
})
