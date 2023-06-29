let useLocalStorage = true;
let getEL = (selector) => document.querySelector(selector);
let getAllEL = (selector) => document.querySelectorAll(selector);
let rows = useLocalStorage ? (JSON.parse(localStorage.getItem(`accessories`)) || []) : [];

let createForm = getEL(`.createForm`);
if (useLocalStorage == true) console.log(`rows that we stored`, rows);
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
        name: formData.accessoryName,
        image: ``,
        category: formData.category,
        company: formData.company,
        location: formData.location,
        supplier: formData.supplier,
        minimum: formData.min_qty,
        cost: formData.purchase_cost,
        model: formData.model_number,
        date: formData.purchase_date,
        quantity: formData.quantity,
        // order_number: formData.order_number,
        remaining: 10,
        manufacturer: formData.manufacturer,
        checkout: true,
    };
    console.log(`New Accessory`, newAccessory);
    rows.push(newAccessory);
    if (useLocalStorage) {
        localStorage.setItem(`accessories`, JSON.stringify(rows));
    } else {
        const options = {
            method: 'POST',
            headers: {accept: 'application/json', 'content-type': 'application/json'},
            body: JSON.stringify({
              name: newAccessory.name,
              qty: newAccessory.quantity,
              purchase_cost: newAccessory.purchase_cost,
              purchase_date: newAccessory.purchase_date,
              model_number: newAccessory.model_number,
              order_number: newAccessory.order_number,
              category_id: 19,
              company_id: 9,
              location_id: 15,
              manufacturer_id: 12,
              supplier_id: 1
            })
          };
          
          fetch(`https://develop.snipeitapp.com/api/v1/accessories`, options)
            .then(response => response.json())
            .then(data => console.log(`Data`, data))
            .catch(err => console.error(err));
    }
    window.location.href = `http://127.0.0.1:5500/`;
})
