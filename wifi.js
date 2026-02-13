/**
 * SISTEMA PROYECT_CS - Módulo Web Interface (WI) v2.0
 * Optimizado para rendimiento y persistencia de datos.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Interfaz WI v2.0 Inicializada.");

    // 1. Persistencia del Modo Oscuro (Verifica si ya estaba activo)
    const isDarkStored = localStorage.getItem('darkMode') === 'true';
    if (isDarkStored) {
        document.body.classList.add('dark-mode');
    }

    // 2. Efecto de entrada en cascada para tarjetas .pn-card
    const animarTarjetas = () => {
        const tarjetas = document.querySelectorAll('.pn-card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.opacity = "0";
            tarjeta.style.transform = "translateY(30px)";
            tarjeta.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

            setTimeout(() => {
                tarjeta.style.opacity = "1";
                tarjeta.style.transform = "translateY(0)";
            }, 150 * index);
        });
    };

    // 3. Barra de progreso de lectura (Opcional pero muy profesional)
    const crearBarraProgreso = () => {
        const bar = document.createElement('div');
        bar.id = 'progress-bar';
        Object.assign(bar.style, {
            position: 'fixed', top: '0', left: '0', height: '4px',
            backgroundColor: '#3498db', width: '0%', zIndex: '9999', transition: 'width 0.1s'
        });
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            bar.style.width = scrolled + "%";
        });
    };

    // 4. Gestión de eventos para el botón de Modo Oscuro
    const btnToggle = document.querySelector('.btn-toggle');
    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark);
            mostrarNotificacion(`Modo ${isDark ? 'Oscuro' : 'Claro'} activado`, 'info');
        });
    }

    // Inicializar funciones
    animarTarjetas();
    crearBarraProgreso();
});

// 5. Notificaciones Mejoradas con efecto de salida
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerText = mensaje;
    
    Object.assign(notificacion.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        padding: '12px 24px', borderRadius: '50px',
        backgroundColor: tipo === 'info' ? '#2c3e50' : '#e67e22',
        color: 'white', fontWeight: 'bold', boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
        zIndex: '1000', opacity: '0', transform: 'translateX(50px)', transition: 'all 0.4s ease'
    });

    document.body.appendChild(notificacion);

    // Entrada y salida con animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateX(50px)';
        setTimeout(() => notificacion.remove(), 400);
    }, 3000);
}