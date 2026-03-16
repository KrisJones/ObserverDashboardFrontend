const machines = ['Picker', 'Grabber', 'Furnace', 'Smelter'];
const tbody = document.getElementById('tbody');

const dummystates = ['idle', 'starved', 'producing']

for (const machine of machines) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${machine}</td>
    <td class="idle" id="${machine}">idle</td>
  `;
  tbody.appendChild(row);
}


//setInterval(() => {
//  const from = machines[Math.floor(Math.random() * machines.length)];
//  const state = dummystates[Math.floor(Math.random() * dummystates.length)];
//  handleUpdate({ from, state });
//}, 1000);

const ws = new WebSocket('https://observerdashboard.onrender.com');

ws.onmessage = (event) => {
  console.log(event)
  const { from, state } = JSON.parse(event.data);
  console.log(state)
  const cell = document.getElementById(from);
  cell.textContent = state;
  cell.className = state;
};

//function handleUpdate({ from, state }) {
 // const cell = document.getElementById(from);
  //if (cell){
  //  cell.textContent = state;
   // cell.className = state;
  //} 
//}