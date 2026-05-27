// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLoveParticles();
    startBirthdayCountdown();
    initializeGalleryEffects();
    initializeScrollAnimations();
    initializeSpecialEffects();
    startContinuousAnimations();
    checkSpecialDate();
});

// ===== SISTEMA DE PARTÍCULAS DE AMOR =====
function initializeLoveParticles() {
    const particlesContainer = document.getElementById('love-particles');
    const loveSymbols = ['💕', '💖', '💝', '🌹', '✨', '💫', '🦋', '🌸'];
    
    function createLoveParticle() {
        const particle = document.createElement('div');
        particle.className = 'love-particle';
        particle.innerHTML = loveSymbols[Math.floor(Math.random() * loveSymbols.length)];
        
        // Posición inicial aleatoria
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-50px';
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 10;
        particle.style.fontSize = size + 'px';
        
        // Duración aleatoria
        const duration = Math.random() * 4 + 6;
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Crear partículas continuamente
    setInterval(createLoveParticle, 800);
    
    // Crear algunas iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(createLoveParticle, i * 200);
    }
}

// ===== CONTADOR DE CUMPLEAÑOS =====
function startBirthdayCountdown() {
    const targetDate = getNextBirthdayDate();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft <= 0) {
            showBirthdaySpecial();
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Actualizar display con animación
        updateCountdownNumber('days', days);
        updateCountdownNumber('hours', hours);
        updateCountdownNumber('minutes', minutes);
        updateCountdownNumber('seconds', seconds);
        
        // Efectos especiales cuando cambian los números
        if (seconds === 0) addCountdownFlash('seconds');
        if (minutes === 0 && seconds === 0) addCountdownFlash('minutes');
        if (hours === 0 && minutes === 0 && seconds === 0) addCountdownFlash('hours');
    }
    
    // Actualizar cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function getNextBirthdayDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthday = new Date(currentYear, 8, 4); // 4 de septiembre
    
    // Si ya pasó este año, usar el próximo año
    if (birthday < now) {
        birthday = new Date(currentYear + 1, 8, 4);
    }
    
    return birthday.getTime();
}

function updateCountdownNumber(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const formattedValue = String(value).padStart(2, '0');
        if (element.textContent !== formattedValue) {
            element.textContent = formattedValue;
            element.style.transform = 'scale(1.2)';
            element.style.color = '#FFD700';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 200);
        }
    }
}

function addCountdownFlash(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.parentNode.style.animation = 'countdownFlash 0.5s ease-in-out';
        setTimeout(() => {
            element.parentNode.style.animation = '';
        }, 500);
    }
}

// ===== EFECTOS DE GALERÍA =====
function initializeGalleryEffects() {
    const photoCards = document.querySelectorAll('.photo-card');
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');

     // Guardar/volver scroll para evitar que el fondo se mueva
    function lockBodyScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        document.body.dataset.scrollY = scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
    }
     function unlockBodyScroll() {
        const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        delete document.body.dataset.scrollY;
        window.scrollTo(0, scrollY);
    }
    
    // Información de cada foto
    const photoInfo = {
        1: {
            title: "Fortnite",
            description: "Quizas no siempre salgan bien las llamadas pero realmente jugar contigo es lo mejor y lo haria todo los dias de mi vida✨",
            image: "31106571-f9e9-4ea2-b435-9f90272a614f.jpg"
        },
        2: {
            title: "Simplemente estar contigo es una sensacion indescriptible",
            description: "Cada momento que paso a tu lado lo valoro y atesoro como si fuera el ultimo dia💕",
            image: "888eeba6-141f-48b5-9c29-bbb7a4ea514b.jpg"
        },
        3: {
            title: "Sos facherisima",
            description: "Me encantas vistas lo que vistas seas como seas me encantaras siempre.",
            image: "027ad8f8-4fec-4361-ba32-ea76e91c2b7c.jpg"
        },
        4: {
            title: "Sos hermosa fer",
            description: "Sos increiblemente hermosa facilmente la mujer mas hermosa del mundo me dejas sin palabras al verte 🖤",
            image: "b9a7ded4-ec12-4975-92f3-76987bf1a088.jpg"
        },
        5: {
            title: "Beatiful girl",
            description: "Amo sacarte fotos siempre no importa si es en la vida real o no si sos vos me encanta",
            image: "4ce34398-07dd-4221-bf42-9ab31504b401.jpg"
        },
        6: {
            title: "Roblos",
            description: "Hay que jugar mas juegos de roblos jiji",
            image: "Captura de pantalla 2024-07-31 184138.png"
        },
        7: {
            title: "Siempre juntos",
            description: "No importa el tiempo siempre vicias al fornai jiji",
            image: "Captura de pantalla 2024-09-09 193402.png"
        },
        8: {
            title: "Nuestro mundo en minecraft",
            description: "Tenemos que volverrr a jugarrrr bobis",
            image: "image.png"
        },
        9: {
            title: "Te acordas‽",
            description: "Un dibujito que hice con mucho esfuerzo y cariño para vos.✨",
            image: "157e76b5-435b-4921-81e9-252b79665c6e.jpg"
        }
    };
    
    // Agregar efectos hover especiales
    photoCards.forEach(card => {
        const photoNumber = card.getAttribute('data-photo');
        
        card.addEventListener('mouseenter', () => {
            createSparkleEffect(card);
            addMagicalGlow(card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeMagicalGlow(card);
        });
        
        card.addEventListener('click', () => {
            const info = photoInfo[photoNumber];
            if (info) {
                modalImage.src = info.image;
                modalTitle.textContent = info.title;
                modalDescription.textContent = info.description;
                modal.style.display = 'block';
                lockBodyScroll();
                
                // Agregar efecto especial al abrir modal
                createConfettiExplosion();
            }
        });
    });
    
    // Cerrar modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        unlockBodyScroll();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            unlockBodyScroll();
        }
    });
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '💫', '🌟', '⭐'];
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.zIndex = '100';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animar sparkle
        sparkle.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(1.5) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

function addMagicalGlow(element) {
    element.classList.add('magical-sparkle');
}

function removeMagicalGlow(element) {
    element.classList.remove('magical-sparkle');
}

// ===== ANIMACIONES DE SCROLL ===== 
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
                
                // Efectos especiales por sección
                if (entry.target.classList.contains('gallery-section')) {
                    animateGalleryCards();
                }
                if (entry.target.classList.contains('love-message-section')) {
                    animateTypingEffect();
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Observar secciones
    const sections = document.querySelectorAll('.gallery-section, .love-message-section, .countdown-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
}

function animateGalleryCards() {
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            createHeartBurst(card);
        }, index * 200);
    });
}

function animateTypingEffect() {
    const lines = document.querySelectorAll('.letter-line');
    lines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
        line.style.animation = 'typeWriter 0.8s ease-in-out forwards';
    });
}

// ===== EFECTOS ESPECIALES =====
function initializeSpecialEffects() {
    // Efecto de cursor con corazones
    document.addEventListener('mousemove', createCursorTrail);
    
    // Efectos en el botón principal
    const mainButton = document.querySelector('.enter-gallery-btn');
    if (mainButton) {
        mainButton.addEventListener('click', () => {
            createButtonExplosion(mainButton);
        });
    }
    
    // Efectos de texto brillante
    animateTextGlow();
}

function createCursorTrail(e) {
    // Limitar la frecuencia del efecto
    if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.innerHTML = '💕';
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.fontSize = '12px';
        trail.style.zIndex = '9999';
        trail.style.color = '#FF9A9E';
        
        document.body.appendChild(trail);
        
        trail.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: 'translate(0, -30px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            trail.remove();
        };
    }
}

function createButtonExplosion(button) {
    const hearts = ['💕', '💖', '💝', '🌹'];
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);
        
        const angle = (i / 15) * 2 * Math.PI;
        const distance = 100 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(1.5) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💝'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '1rem';
        heart.style.zIndex = '100';
        
        document.body.appendChild(heart);
        
        heart.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(1)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

function animateTextGlow() {
    const glowElements = document.querySelectorAll('.highlight-word, .gallery-title, .countdown-title');
    
    setInterval(() => {
        glowElements.forEach(element => {
            element.style.textShadow = `0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor`;
            setTimeout(() => {
                element.style.textShadow = '';
            }, 1000);
        });
    }, 5000);
}

// ===== ANIMACIONES CONTINUAS =====
function startContinuousAnimations() {
    // Corazones aleatorios cada cierto tiempo
    setInterval(() => {
        createRandomFloatingHeart();
    }, 2000);
    
    // Efectos de brillos aleatorios
    setInterval(() => {
        addRandomSparkle();
    }, 3000);
}

function createRandomFloatingHeart() {
    const hearts = ['💕', '💖', '💝', '🌹', '🦋'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
    
    document.body.appendChild(heart);
    
    heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 6000 + Math.random() * 4000,
        easing: 'ease-out'
    }).onfinish = () => {
        heart.remove();
    };
}

function addRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.fontSize = '2rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1';
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
        { transform: 'scale(1.5) rotate(180deg)', opacity: 1 },
        { transform: 'scale(0) rotate(360deg)', opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-in-out'
    }).onfinish = () => {
        sparkle.remove();
    };
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function scrollToGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Efecto especial al llegar
        setTimeout(() => {
            createConfettiExplosion();
        }, 1000);
    }
}

function createConfettiExplosion() {
    const colors = ['#FF9A9E', '#FECFEF', '#FFD700', '#6B73FF', '#FF6B6B'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '30%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const angle = (i / 30) * 2 * Math.PI;
        const distance = 200 + Math.random() * 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        confetti.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}

// ===== EFECTOS ESPECIALES DE CUMPLEAÑOS =====
function checkSpecialDate() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    // Si es 4 de septiembre
    if (currentMonth === 8 && currentDay === 4) {
        showBirthdaySpecial();
    }
    
    // Si falta una semana o menos
    const birthday = new Date(today.getFullYear(), 8, 4);
    if (birthday < today) {
        birthday.setFullYear(today.getFullYear() + 1);
    }
    
    const timeLeft = birthday - today;
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 7) {
        addPreBirthdayEffects();
    }
}

function showBirthdaySpecial() {
    // Cambiar el fondo a modo cumpleaños
    document.body.style.background = 'linear-gradient(135deg, #FF6B9D 0%, #FFD700 50%, #FF9A9E 100%)';
    
    // Confeti continuo
    setInterval(() => {
        createConfettiExplosion();
    }, 3000);
    
    // Mensaje especial
    const specialMessage = document.createElement('div');
    specialMessage.innerHTML = `
        <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 10000; text-align: center; font-family: 'Dancing Script', cursive;">
            <h2 style="color: #FF6B9D; font-size: 2rem; margin-bottom: 1rem;">🎉 ¡FELIZ CUMPLEAÑOS FER! 🎉</h2>
            <p style="color: #2C2C54; font-size: 1.2rem;">¡Hoy es tu día especial! 💕</p>
            <button onclick="this.parentNode.parentNode.remove()" style="margin-top: 1rem; background: #FF6B9D; color: white; border: none; padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer;">Cerrar</button>
        </div>
    `;
    document.body.appendChild(specialMessage);
    
    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        if (specialMessage.parentNode) {
            specialMessage.remove();
        }
    }, 10000);
}

function addPreBirthdayEffects() {
    // Más partículas de amor
    setInterval(() => {
        createRandomFloatingHeart();
    }, 1000);
    
    // Más brillos
    setInterval(() => {
        addRandomSparkle();
    }, 1500);
}

// ===== OPTIMIZACIONES PARA MÓVIL =====
if (window.innerWidth < 768) {
    // Reducir efectos en dispositivos móviles para mejor rendimiento
    const style = document.createElement('style');
    style.textContent = `
        .love-particle { animation-duration: 12s !important; }
        .floating-hearts-bg i { animation-duration: 20s !important; }
    `;
    document.head.appendChild(style);
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.log('Error manejado:', e.error);
    // Continuar funcionando incluso si hay errores menores
});

// ===== EVENTOS ESPECIALES =====
document.addEventListener('keydown', (e) => {
    // Easter egg: presionar 'L' para más amor
    if (e.key.toLowerCase() === 'l') {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createRandomFloatingHeart();
            }, i * 100);
        }
    }
    
    // Easter egg: presionar 'F' para Fer
    if (e.key.toLowerCase() === 'f') {
        createConfettiExplosion();
    }
});
