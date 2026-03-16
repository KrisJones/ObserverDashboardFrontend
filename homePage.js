const machines = ['Picker', 'Grabber', 'Furnace'];
const tbody = document.getElementById('tbody');

//to start with we have a generic list of machines and we build a html table up
//in reality youll likely have an initial set up alert or way of retrieving what
//you will be using
for (const machine of machines) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${machine}</td>
    <td class="idle" id="${machine}">idle</td>
  `;
  tbody.appendChild(row);
}

//I've set up the backend repos on a website just to demonstrate how this would work
//this required some googling and research to understand potential options
const ws = new WebSocket('https://observerdashboard.onrender.com');

ws.onmessage = (event) => {
  const { from, state } = JSON.parse(event.data);

  //check if the element exists and then pull it in and change the details
  if(document.getElementById(from)){
    const cell = document.getElementById(from);
    cell.textContent = state;
    //i've set up idle, starved and producing as class names to add the style
    //formatting requested, you could also do more of whats done here and format
    //the style manually with a switch or an if statement, but either way
    //unless colour is supplied from the backend youll need to make some kind of decision here
    cell.className = state;
  }else{
    //if the from event is new we can assume its a new machine
    //so we add it to the list of machines and make a new row
    //you could also just have this as a safeguard and ignore any unexpected alerts
    machines.push(from);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${from}</td>
      <td class="${state}" id="${from}">${state}</td>`;
    tbody.appendChild(row);
  }
};

