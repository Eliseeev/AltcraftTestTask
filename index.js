const objNamesTheadTable = {
    0: 'ID',
    1: 'SURVIVED/NOT SURVIVED',
    2: "Passenger's name",
    3: 'Gender [male/female]',
    4: "Passenger's age [ year's ]",
    5: 'Ticket number [№]',
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
    
    const data = await response.json()

    const checkID = (value) => {
        if(value) return `[${value}]`;
        if(value === '' || value === null) return `[UNAVAILABLE]`
    }

    const checkSurvival = (value) => {
        if(value) return `[SURVIVED]`;
        if(value === '' || value === null) return `[UNAVAILABLE]`
        return `[NOT SURVIVED]`
    }

    const checkGender = (value) => {
        if(value === 'female') return '[F]'
        if(value === '' || value === null) return `[UNAVAILABLE]`
        return '[M]'
    }

    const checkName = (value) => {
        if(value === '' || value === null) return `[UNAVAILABLE]`
        return value
    }

    const checkAge = (value) => {
        if(value === '' || value === null) return `[UNAVAILABLE]`
        return `${Math.ceil(value)}y`
    }

    const checkTicket = (value) => {
        if(value === '' || value === null) return `[UNAVAILABLE]`
        return value
    }

    let passengerData = data.slice(nextPosts, page).map((item) => {
       return {
        id: checkID(item.id),
        survived: checkSurvival(item.survived),
        name: checkName(item.name),
        gender: checkGender(item.gender),
        age: checkAge(item.age),
        ticket: checkTicket(item.ticket),
       }
    })

    const render = (value) => {
        return value.map((item) => {
            let tr = document.createElement('tr');
                tr.classList.add('tableRow');
            for(let key in item){
                let td = document.createElement('td'); 
                td.classList.add('tableCell')
                td.textContent = item[key];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        })
    }

    render(passengerData)

    table.appendChild(tbody)
    document.body.appendChild(table)


    document.getElementById('btn').addEventListener('click', function() {
        const inputValue = document.getElementById("searchInput").value;

        if(!inputValue) return passengerData

        let tableRows = passengerData.filter(row => Object.values(row).some(value => value.toString().includes(inputValue)));
        tbody.innerHTML = '';
        render(tableRows)
      });
}

dataDownLoad(numberOfLines);

window.addEventListener('scroll', () => {
    let nextPosts = 0
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        nextPosts = numberOfLines
        numberOfLines += numberOfLines 
        dataDownLoad(numberOfLines, nextPosts);
    }
});







