// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('js-status');
    const button = document.getElementById('btn-click');

    // Confirmar que el JS funciona
    statusElement.textContent = "✅ Activo y conectado";
    statusElement.style.color = "#00ff88";

    // Evento del botón
    button.addEventListener('click', () => {
        alert("¡Hola! El equipo de Proyecto CS está listo para programar.");
        console.log("Botón presionado correctamente.");
    });
});