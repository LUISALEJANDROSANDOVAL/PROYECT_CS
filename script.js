document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('team-grid');
    const syncBtn = document.getElementById('btn-sync');

    // Datos simulados (como si vinieran del data.json)
    const teamData = [
        { nombre: "Luis Alejandro", rol: "Líder", status: "Online" },
        { nombre: "Víctor", rol: "Backend", status: "Away" },
        { nombre: "Ismael", rol: "Frontend", status: "Offline" }
    ];

    const loadTeam = () => {
        teamGrid.innerHTML = '';
        teamData.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h4>${member.nombre}</h4>
                <p style="font-size: 0.8rem; color: #6366f1">${member.rol}</p>
                <small>${member.status}</small>
            `;
            teamGrid.appendChild(card);
        });
    };

    syncBtn.addEventListener('click', () => {
        syncBtn.innerText = "Sincronizando...";
        setTimeout(() => {
            loadTeam();
            syncBtn.innerText = "Datos Sincronizados";
            syncBtn.style.background = "#10b981";
        }, 1000);
    });
});