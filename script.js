fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('playerGrid');
    const input = document.getElementById('searchInput');

    function displayPlayers(players) {
      gallery.innerHTML = '';
      players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'playerCard';
        const [firstName, lastName] = player.name.split(" ");
        div.innerHTML = `
          <img src="images/${player.image}" alt="${player.name}" />
          <div class="player-info">
            <span class="player-name">${firstName}<br>${lastName}</span>
            <span class="player-number">#${player.number}</span>
          </div>
          <a href="images/${player.image}" download class="download-btn" title="Bild herunterladen">⬇️</a>
          `;
        gallery.appendChild(div);
      });
    }

    input.addEventListener('input', () => {
      const value = input.value.toLowerCase();
      const filtered = data.filter(player =>
        player.name.toLowerCase().includes(value) ||
        player.number.toString().includes(value) ||
        (player.keywords && player.keywords.some(k => k.includes(value)))
      );
      displayPlayers(filtered);
    });

    displayPlayers(data);
  });
