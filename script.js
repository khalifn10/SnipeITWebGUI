let rows = [];
let columnLabels = [];
let getEL = (selector) => document.querySelector(selector);
let headerRow = getEL(`.headerRow`);
let middleRows = getEL(`.middleRows`);
let footerRow = getEL(`.footerRow`);

let snipeITacceccoriesAPIUrl = `https://develop.snipeitapp.com/api/v1/accessories?limit=50&offset=0&order_number=null&sort=created_at&order=desc&expand=false`;

let setLabelRows = (labels, rowsToAffectArray) => {
  rowsToAffectArray.forEach(labelRow => {
    labelRow.innerHTML = ``;
    labels.forEach(label => {
      let newColumn = document.createElement(`div`);
      newColumn.classList.add(`headerColumn`);
      newColumn.classList.add(`column`);
      newColumn.innerHTML = label;

      labelRow.append(newColumn);
    })
  })
}

let getAccessories = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTU2MDc0MjVmYjM5YTEwYjFjNTZlZTAxMTBmZDk4ZjQ0ZjVjODMzYjcxZWVhYjZlNDk1NGMwOThlY2YzMzU2MDY4Mzg4MmFhMDMzOTAzNzciLCJpYXQiOjE2MzI4NjU5MTgsIm5iZiI6MTYzMjg2NTkxOCwiZXhwIjoyMjY0MDIxNTE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LgGVzyH67IRhXvccHd4j2Dn6TDuIuQTBoo30_wD9jPehy8v_h0xBmE1-dOUBRJyeJOI8B4gwPeALsWaudpGj9Lb5qWAtKV7eYtH9IYQKoLF_iHgOGXnAUcNwID6zBU_YyLNSI6gp8zjutLJias33CBLsHy5ZRNpxVibVrZouJ_HjYuIYbtZyLus-KFFeibtZoPiTWOeHhQFD37MR6ifx4dBqT37fN-xDS99mONtrkAplEIou5aSO1oZ4IlJIPCUyA1lixPgpn1YU7PxiBDZp1teeugD0WEmrAqxRS2I0bH4qPsuTsrVXS_lo87Sf5LBGLW7lGHKqyYH6J47OZOM0K-SrxLKtE1ww8jyLBgnnxH0lJHRLCBiwUnL5ZGTUmiOysUA-wSJ6s78o8Pc-ec6bpBvAlelHdiQ-wslE7gzEJDptbejFg-75b_CEwgJYh7J2D18ul6Qu5EFCUEgt033mm04dgVk0isWTDt6EW5ZvTo5Qhr1LY0YnEIXCTqIRN-BSQjL55sZaCrtwR_21bnBGgniyI5MRDYblFawVmFKroeClCpSjBo9vi66akdD5hjpvx67RL3r33BZQhEXmPifUPNH5wP_U-IHGFUD99TJk2c1awF0RASveZRLSunbJb1x6hGAVUaIvQV4r2quWzXqYyKLph9kGTyJYrb6iJtH5smE'
        }
      };

      fetch(snipeITacceccoriesAPIUrl, options).then(response => {
          if (response.status == 200) return response.json();
        }).then(data => {
          if (data.rows && data.rows.length > 0) {
            data.rows.forEach((acc, accIndex) => {
              let { id, name, image, category, company, location, supplier, min_qty, purchase_cost, model_number, purchase_date, qty, remaining_qty, manufacturer, user_can_checkout } = acc;
              
              let accessoryForTable = { 
                id,
                name,
                image,
                category: category.name,
                company,
                location: location.name,
                supplier: supplier.name,
                minimum: min_qty,
                cost: purchase_cost,
                model: model_number,
                date: purchase_date,
                quantity: qty,
                remaining: remaining_qty,
                manufacturer: manufacturer.name,
                checkout: user_can_checkout 
              };
           
              rows.push(accessoryForTable);
              columnLabels = Object.keys(accessoryForTable);
            })

            console.log(`accessories`, rows);
            middleRows.innerHTML = ``;
            rows.forEach(row => {
              let newRow = document.createElement(`div`);
              newRow.classList.add(`middleRow`);
              newRow.classList.add(`row`);
              let values = Object.values(row);
              setLabelRows(values, [newRow]);
              middleRows.append(newRow);
            })
           
           setLabelRows(columnLabels, [headerRow, footerRow]);
          }
          return data;
        })
        .catch(err => console.error(err));
    } catch (error) {
        console.log(error);
    }
}

getAccessories();