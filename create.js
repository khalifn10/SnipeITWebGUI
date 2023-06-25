let getEL = (selector) => document.querySelector(selector);
let getAllEL = (selector) => document.querySelectorAll(selector);

let createForm = getEL(`.createForm`);
createForm.addEventListener(`submit`, (CreateFormSubmitEvent) => {
    CreateFormSubmitEvent.preventDefault();
    
    let accessoryToCreate = {};
    let formFields = getAllEL(`.formField`);
    Object.assign(accessoryToCreate, ...([...formFields].map(field => {
        return {
            [field.name]: field.value,
        }
    }))); 
    console.log(`Accessory to push`, accessoryToCreate);
})