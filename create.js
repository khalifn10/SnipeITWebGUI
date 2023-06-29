let useLocalStorage = false;
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
    // console.log(`Form Data`, formData);
    let newAccessory = {
        id: rows.length + 1,
        name: formData.accessoryName,
        image: formData.image,
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
    // console.log(`New Accessory`, newAccessory);
    rows.push(newAccessory);
    if (useLocalStorage) {
        localStorage.setItem(`accessories`, JSON.stringify(rows));
    } else {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json', Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTU2MDc0MjVmYjM5YTEwYjFjNTZlZTAxMTBmZDk4ZjQ0ZjVjODMzYjcxZWVhYjZlNDk1NGMwOThlY2YzMzU2MDY4Mzg4MmFhMDMzOTAzNzciLCJpYXQiOjE2MzI4NjU5MTgsIm5iZiI6MTYzMjg2NTkxOCwiZXhwIjoyMjY0MDIxNTE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LgGVzyH67IRhXvccHd4j2Dn6TDuIuQTBoo30_wD9jPehy8v_h0xBmE1-dOUBRJyeJOI8B4gwPeALsWaudpGj9Lb5qWAtKV7eYtH9IYQKoLF_iHgOGXnAUcNwID6zBU_YyLNSI6gp8zjutLJias33CBLsHy5ZRNpxVibVrZouJ_HjYuIYbtZyLus-KFFeibtZoPiTWOeHhQFD37MR6ifx4dBqT37fN-xDS99mONtrkAplEIou5aSO1oZ4IlJIPCUyA1lixPgpn1YU7PxiBDZp1teeugD0WEmrAqxRS2I0bH4qPsuTsrVXS_lo87Sf5LBGLW7lGHKqyYH6J47OZOM0K-SrxLKtE1ww8jyLBgnnxH0lJHRLCBiwUnL5ZGTUmiOysUA-wSJ6s78o8Pc-ec6bpBvAlelHdiQ-wslE7gzEJDptbejFg-75b_CEwgJYh7J2D18ul6Qu5EFCUEgt033mm04dgVk0isWTDt6EW5ZvTo5Qhr1LY0YnEIXCTqIRN-BSQjL55sZaCrtwR_21bnBGgniyI5MRDYblFawVmFKroeClCpSjBo9vi66akdD5hjpvx67RL3r33BZQhEXmPifUPNH5wP_U-IHGFUD99TJk2c1awF0RASveZRLSunbJb1x6hGAVUaIvQV4r2quWzXqYyKLph9kGTyJYrb6iJtH5smE', 'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: newAccessory.name,
                qty: newAccessory.quantity,
                purchase_cost: newAccessory.purchase_cost,
                purchase_date: newAccessory.purchase_date,
                model_number: newAccessory.model_number,
                order_number: newAccessory.order_number,
                category_id: 1,
                company_id: 9,
                location_id: 15,
                manufacturer_id: 12,
                supplier_id: 1,
                ...(useLocalStorage && {
                    image: useLocalStorage ? newAccessory.image : ``,
                })
            })
        };
        
        fetch(`https://develop.snipeitapp.com/api/v1/accessories`, options)
        .then(response => response.json())
        .then(data => {
            // console.log(`Data`, data);
            window.location.href = `/`;
        })
        .catch(err => console.error(err));
    }
})
