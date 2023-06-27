let getEL = (selector) => document.querySelector(selector);
let getAllEL = (selector) => document.querySelectorAll(selector);
let rows = JSON.parse(localStorage.getItem(`accessories`)) || [];

let createForm = getEL(`.createForm`);
console.log(`rows that we stored`, rows);
createForm.addEventListener(`submit`, (CreateFormSubmitEvent) => {
    CreateFormSubmitEvent.preventDefault();
    
    let formData = {};
    let formFields = getAllEL(`.formField`);
    Object.assign(formData, ...([...formFields].map(field => {
        return {
            [field.name]: field.value,
        }
    }))); 
    console.log(`Form Data`, formData);
    let newAccessory = {
        id: rows.length + 1,
        image: ``,
        location: formData.location,
        manufacturer: formData.manufacturer,
        category: formData.category,
        company: formData.company,
        supplier: formData.supplier,
        // order_number: formData.order_number,
        remaining: 10,
        date: formData.purchase_date,
        cost: formData.purchase_cost,
        name: formData.accessoryName,
        model: formData.model_number,
        minimum: formData.min_qty,
        quantity: formData.quantity,
        checkout: true
    };
    console.log(`New Accessory`, newAccessory);
    rows.push(newAccessory);
    localStorage.setItem(`accessories`, JSON.stringify(rows));
    window.location.href = `http://127.0.0.1:5500/`;
})