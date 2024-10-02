let addedPlayers = [];
let playerCount = 0;
const load_all_players = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A')
        .then(res => res.json())
        .then(data => {
            if (data.player) {
                displayPlayers(data.player);
            } 
            else {
                alert('Not found');
            }
        })
};
const displayPlayers = (players) => {
    const playersContainer = document.getElementById("player-container");
    playersContainer.innerHTML = '';
    players.forEach((player) => {
        const div = document.createElement("div");
        div.classList.add("card", "col-md-4", "mt-3");
        div.innerHTML = `
            <img class="card-img" src="${player.strThumb || 'https://via.placeholder.com/150'}" alt="Player Image">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer || 'N/A'}</h5>
                <p class="card-text">Nationality: ${player.strNationality || 'N/A'}</p>
                <p class="card-text">Team: ${player.strTeam || 'N/A'}</p>
                <p class="card-text">Sport: ${player.strSport || 'N/A'}</p>
                <p class="card-text">Description: ${player.strDescriptionEN?.slice(0, 50) || 'N/A'}...</p>
                <button class="btn btn-primary" onClick="AddToGroup('${player.strPlayer}')">Add To Group</button>
                <button class="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="Show_details('${player.idPlayer}')">Details</button>
            </div>
        `;
        playersContainer.appendChild(div);
    });
};
const AddToGroup = (playerName) => {
    if (playerCount >= 11) {
        alert('cannot add more than 11 players!');
        return;
    }
    if (!addedPlayers.includes(playerName)) {
        addedPlayers.push(playerName);
        playerCount++;
        updateGroupSection();
    }
};
const updateGroupSection = () => {
    const cartContainer = document.getElementById("cart-main-container");
    cartContainer.innerHTML = '';
    addedPlayers.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("cart-info");
        div.innerHTML = `<p>${player}</p>`;
        cartContainer.appendChild(div);
    });
    document.getElementById("count").innerText = playerCount;
};

const Show_details = (playerID) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerID}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0];
            document.getElementById('modal-body').innerHTML = `
                <img class="card-img" src="${player.strThumb || 'https://via.placeholder.com/150'}" alt="Player Image">
                <h5 class="mt-2">Name: ${player.strPlayer || 'N/A'}</h5>
                <p>Nationality: ${player.strNationality || 'N/A'}</p>
                <p>Team: ${player.strTeam || 'N/A'}</p>
                <p>Sport: ${player.strSport || 'N/A'}</p>
                <p>Description: ${player.strDescriptionEN?.slice(0, 50) || 'N/A'}...</p>
            `;
        })
};

document.getElementById('search-btn').addEventListener('click', () => {
    const searchValue = document.getElementById('player-name').value;
    if (searchValue.trim() === '') {
        alert('enter player name');
        return;
    }
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            if (data.player) {
                displayPlayers(data.player);
            } 
            else {
                alert('Not found');
            }
        })
});

load_all_players();