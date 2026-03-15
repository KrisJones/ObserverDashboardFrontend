const machines = ['Machine A', 'Machine B', 'Machine C', 'Machine D'];
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


setInterval(() => {
  const from = machines[Math.floor(Math.random() * machines.length)];
  const state = dummystates[Math.floor(Math.random() * dummystates.length)];
  handleUpdate({ from, state });
}, 1000);

//const ws = new WebSocket('wss://your-url');

//ws.onmessage = (event) => {
 // const { from, state } = JSON.parse(event.data);
 // const cell = document.getElementById(from);
 // cell.textContent = state;
//};

function handleUpdate({ from, state }) {
  const cell = document.getElementById(from);
  if (cell){
    cell.textContent = state;
    cell.className = state;
  } 

}