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
let flag = true;

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
 
async function dataDownLoad(tickets, followingTickets){
    const response = await fetch(`https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json?`);
    
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

    const allPassengerData = data.map((item) => ({
        id: checkID(item.id),
        survived: checkSurvival(item.survived),
        name: checkName(item.name),
        gender: checkGender(item.gender),
        age: checkAge(item.age),
        ticket: checkTicket(item.ticket),
    }))

    const passengerData = data.slice(followingTickets, tickets).map((item) => ({
        id: checkID(item.id),
        survived: checkSurvival(item.survived),
        name: checkName(item.name),
        gender: checkGender(item.gender),
        age: checkAge(item.age),
        ticket: checkTicket(item.ticket),
    }))

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
        flag = false;
        const inputValue = document.getElementById("searchInput").value;

        let div = document.createElement('div');
            div.classList.add('notFoundBlock');
        let p = document.createElement('p');
            p.classList.add('notFoundStr');
            p.textContent = `Nothing was found for the query «${inputValue}»`
        let p1 = document.createElement('p1');
            p1.classList.add('notFoundStrChangeSearch')
            p1.textContent = 'Change the search query'
            div.appendChild(p)
            div.appendChild(p1)

        let tableRows = allPassengerData.filter(row => Object.values(row).some(value => value.toString().includes(inputValue)));
        tbody.innerHTML = '';

        if(tableRows.length > 0) return render(tableRows);
        else return document.body.appendChild(div)
      });
}

dataDownLoad(numberOfLines);

window.addEventListener('scroll', () => {
    let followingTickets = 0
        if(flag){
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                followingTickets = numberOfLines
                numberOfLines += 50
                dataDownLoad(numberOfLines, followingTickets);
            }
         }
});







