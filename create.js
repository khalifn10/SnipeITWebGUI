let getEL = (selector) => document.querySelector(selector);
let getAllEL = (selector) => document.querySelectorAll(selector);

let createForm = getEL(`.createForm`);
createForm.addEventListener(`submit`, (CreateFormSubmitEvent) => {
    CreateFormSubmitEvent.preventDefault();
    // console.log(CreateFormSubmitEvent);

    let accessoryToCreate = {};
    let formFields = getAllEL(`.formField`);
    formFields.forEach(formField => {
        console.log(formField);
        Object.assign(accessoryToCreate, );
    }) 
})