const initApp = () => {
    const statusText = document.getElementById('js-status');
    const actionBtn = document.getElementById('btn-action');
    const logMessage = document.getElementById('log-message');

    // Simular carga de datos
    setTimeout(() => {
        statusText.innerHTML = "🟢 <span style='color: #10b981'>Sincronizado con GitHub</span>";
    }, 1500);

    // Manejo de eventos
    actionBtn.addEventListener('click', () => {
        actionBtn.innerText = "Procesando...";
        actionBtn.style.opacity = "0.7";
        
        setTimeout(() => {
            const fecha = new Date().toLocaleTimeString();
            logMessage.innerText = `[${fecha}] Diagnóstico completado: Ramas optimizadas.`;
            actionBtn.innerText = "Ejecutar Diagnóstico";
            actionBtn.style.opacity = "1";
        }, 2000);
    });
};

// Ejecutar cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', initApp);