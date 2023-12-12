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

// CurrentPage меняется в зависимости от размеров экрана. Служит для начального отображения строк

let currentPage = 25;

async function dataDownLoad(page, nextPosts){
    let response = await fetch(`https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json?`);
    
    let data = await response.json()

    const arrNamesBodyTable = ['F', 'M', 'NOT SURVIVED', 'SURVIVED'];

    data.slice(nextPosts, page).map((item) => {
   
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
    })
    table.appendChild(tbody)

    document.body.appendChild(table)

    document.getElementById('btn').addEventListener('click', function() {
        var inputValue = document.getElementById("searchInput").value;
        let tableRows = document.querySelectorAll('.tableRow');
        tableRows.forEach(row => {
          if (row.textContent.includes(inputValue)) {
            row.style.display = 'table-row';
          } else {
            row.style.display = 'none';
          }
        });
      });
}

dataDownLoad(currentPage);

window.addEventListener('scroll', () => {
    let nextPosts = 0
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        nextPosts = currentPage
        currentPage += 25
        dataDownLoad(currentPage, nextPosts);
    }
});




