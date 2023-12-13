const objNamesTheadTable = {
    0: 'SURVIVED/NOT SURVIVED',
    1: "Passenger's name",
    2: 'Gender [male/female]',
    3: "Passenger's age [ year's ]",
    4: 'Ticket number [№]',
}

let thead = document.createElement('thead');
let tr = document.createElement('tr');
let table = document.createElement('table');
let tbody = document.createElement('tbody');
tbody.classList.add('tableBody');

for (var key in objNamesTheadTable) {
    let th = document.createElement('th');
    th.textContent = objNamesTheadTable[key];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  const screenHeight = window.innerHeight;
  const lineHeight = 69;
  let numberOfLines = Math.ceil(screenHeight / lineHeight) + 1;

async function dataDownLoad(page, nextPosts){
    let response = await fetch(`https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json?`);
    
    let data = await response.json()

    const arrNamesBodyTable = ['[F]', '[M]', 'NOT SURVIVED', 'SURVIVED'];

    let filterPassengersData = data.filter((item) => {
        if(item.gender !== '') {
            return item
        }
    })
    
    let dataObj = filterPassengersData.slice(nextPosts, page).map((item) => {
   
        let tr = document.createElement('tr');
        tr.classList.add('tableRow');

        let name = item.name;
        let survived = item.survived;
        let gender = item.gender;
        let age = item.age;
        let ticket = item.ticket;

        if(name !== '') {
            for(let key in item){
                if(item[key] === name || item[key] === survived || item[key] === gender || item[key] === age || item[key] === ticket){
    
                    switch(item[key]){
                        case 'female':
                            item[key] = arrNamesBodyTable[0];
                            break;
                        case 'male':
                            item[key] = arrNamesBodyTable[1];
                            break;
                        case false:
                            item[key] = `[ ${arrNamesBodyTable[2]} ]`;
                            break;
                        case true:
                            item[key] = `[ ${arrNamesBodyTable[3]} ]`;
                            break;
                        case age:
                            item[key] = `${Math.ceil(item[key])}y`;
                            break;
                    }
    
                    if(typeof(item[key]) === 'number') {
                        item[key] = Math.round(item[key]);
                    }
    
                    let td = document.createElement('td'); 
                    td.classList.add('tableCell')
                    td.textContent = item[key];
                    tr.appendChild(td);
                }
            }
        }
          
        tbody.appendChild(tr);
        
        return {
            survived,
            name,
            gender,
            age,
            ticket,
        }
    })

    table.appendChild(tbody)
    document.body.appendChild(table)

    document.getElementById('btn').addEventListener('click', function() {
        var inputValue = document.getElementById("searchInput").value;

        let theFirstModifiedData = dataObj.map((item) => {
            if(item.survived === true){
                return item.survived =`[ ${arrNamesBodyTable[3]} ]`, {...item}
            }
            if(item.survived === false){
                return item.survived = `[ ${arrNamesBodyTable[2]} ]`, {...item}
            }
        })

        let theSecondModifiedData = theFirstModifiedData.map((item) => {
            if(item.gender === 'female'){
                return item.gender = arrNamesBodyTable[0], {...item}
            }
            if(item.gender === 'male'){
                return item.gender = arrNamesBodyTable[1], {...item}
            }
            if(item.age){
                return item.age = `${Math.ceil(item.age)}y`, {...item}
            }
        })

        let thirdModifiedData = theSecondModifiedData.map((item) => {
            if(item.age){
                return item.age = `${Math.ceil(item.age)}y`, {...item}
            }
        })

        let tableRows = thirdModifiedData.filter(row => Object.values(row).some(value => value.toString().includes(inputValue)));
        tbody.innerHTML = '';
        tableRows.forEach(row => {
          let tr = document.createElement('tr');
          tr.classList.add('tableRow');

          for (let key in row) {

            let td = document.createElement('td');
            td.classList.add('tableCell');
            td.textContent = row[key];
            tr.appendChild(td);

          }
          tbody.appendChild(tr);
        });
      });
}

dataDownLoad(numberOfLines);

window.addEventListener('scroll', () => {
    let nextPosts = 0
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        nextPosts = numberOfLines
        console.log(nextPosts)
        numberOfLines += numberOfLines 
        dataDownLoad(numberOfLines, nextPosts);
    }
});

// if(key === 'name' || key === 'survived' || key === 'gender' || key === 'age' || key === 'ticket'){

            //     if(row[key] === true) row[key] = `[ ${arrNamesBodyTable[3]} ]`
            //     if(row[key] === false) row[key] = `[ ${arrNamesBodyTable[2]} ]`
            //     if(row[key] === 'male') row[key] = arrNamesBodyTable[1];
            //     if(row[key] === 'female') row[key] = arrNamesBodyTable[0];
            // }






