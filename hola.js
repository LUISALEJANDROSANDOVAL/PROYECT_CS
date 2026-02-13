/**
 * SISTEMA PROYECT_CS - Módulo de Funciones
 * Autor: Luis Alejandro Sandoval
 */

// 1. Función para saludar dinámicamente
const saludarUsuario = () => {
    const hora = new Date().getHours();
    let saludo;

    if (hora < 12) saludo = "¡Buenos días, Luis! ☀️";
    else if (hora < 18) saludo = "¡Buenas tardes, Luis! ☕";
    else saludo = "¡Buenas noches, Luis! 🌙";

    // Intentamos buscar un elemento con ID 'mensaje-bienvenida'
    const display = document.getElementById('mensaje-bienvenida');
    
    if (display) {
        display.style.opacity = 0;
        display.innerText = saludo;
        // Efecto suave de aparición
        setTimeout(() => display.style.opacity = 1, 100);
    } else {
        console.log("Sistema: " + saludo);
    }
};

// 2. Función para calcular totales en tablas (Nueva)
const calcularTotalVentas = () => {
    const celdasPrecio = document.querySelectorAll('td:nth-child(4)'); // Busca la columna Subtotal
    let sumaTotal = 0;

    celdasPrecio.forEach(celda => {
        const valor = parseFloat(celda.innerText.replace('$', ''));
        if (!isNaN(valor)) sumaTotal += valor;
    });

    console.log(`Cálculo de ventas completado: $${sumaTotal.toFixed(2)}`);
};

// 3. Inicialización del sistema
document.addEventListener('DOMContentLoaded', () => {
    saludarUsuario();
    calcularTotalVentas();
    console.log("✅ Módulo 'hola.js' inicializado en rama: funciones");
});