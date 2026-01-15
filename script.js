// Datos iniciales para la página
document.addEventListener('DOMContentLoaded', function() {
    // Establecer el año actual
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Inicializar componentes
    initBackgroundHearts();
    initMessageEditor();
    initGallery();
    initVideos();
    initMusicPlayer();
    initEffects();
    initUploads();
    
    // Inicializar modal
    initModal();
});

// 1. Corazones de fondo
function initBackgroundHearts() {
    const backgroundHearts = document.querySelector('.background-hearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.innerHTML = '❤';
        
        // Posición aleatoria
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio
        const size = 20 + Math.random() * 30;
        heart.style.fontSize = `${size}px`;
        
        // Retraso de animación aleatorio
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        // Color pastel aleatorio
        const pastelColors = [
            'rgba(255, 224, 130, 0.3)',
            'rgba(255, 204, 128, 0.3)',
            'rgba(255, 183, 77, 0.3)',
            'rgba(255, 167, 38, 0.3)',
            'rgba(255, 152, 0, 0.3)'
        ];
        heart.style.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        
        backgroundHearts.appendChild(heart);
    }
}

// 2. Editor de mensaje
function initMessageEditor() {
    const messageContent = document.getElementById('messageContent');
    const saveMessageBtn = document.getElementById('saveMessage');
    const changeFontBtn = document.getElementById('changeFont');
    
    let currentFont = 0;
    const fonts = [
        "'Poppins', sans-serif",
        "'Dancing Script', cursive",
        "'Playfair Display', serif",
        "'Arial', sans-serif"
    ];
    
    // Guardar mensaje en localStorage
    saveMessageBtn.addEventListener('click', function() {
        const message = messageContent.innerHTML;
        localStorage.setItem('loveMessage', message);
        
        // Mostrar confirmación
        this.innerHTML = '<i class="fas fa-check"></i> Mensaje Guardado';
        this.style.background = 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-save"></i> Guardar Mensaje';
            this.style.background = 'linear-gradient(135deg, #FFD54F 0%, #FFB74D 100%)';
        }, 2000);
        
        // Efecto de confeti
        createHearts(10);
    });
    
    // Cambiar fuente del mensaje
    changeFontBtn.addEventListener('click', function() {
        currentFont = (currentFont + 1) % fonts.length;
        messageContent.style.fontFamily = fonts[currentFont];
        
        // Efecto visual
        messageContent.style.transform = 'scale(1.05)';
        setTimeout(() => {
            messageContent.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Cargar mensaje guardado si existe
    const savedMessage = localStorage.getItem('loveMessage');
    if (savedMessage) {
        messageContent.innerHTML = savedMessage;
    }
}

// 3. Galería de imágenes
function initGallery() {
    const gallery = document.getElementById('imageGallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    // Imágenes de ejemplo (reemplazar con tus propias imágenes)
    const images = [
        {
            url: 'imagenes/beso_amor.jpg',
            caption: 'Beso con la mujer de mi vida'
        },
        {
            url: 'imagenes/besho.jpg',
            caption: 'Esa sonrisa que me enamora'
        },
        {
            url: 'imagenes/mi_amor.jpg',
            caption: 'Momentos inolvidables'
        },
        {
            url: 'imagenes/mi_vida.jpg',
            caption: 'mi vida'
        },
        {
            url: 'imagenes/salidita.jpg',
            caption: 'Esa mirada que lo dice todo'
        },
        {
            url: 'imagenes/playita.jpg',
            caption: 'Nuestro amor crece cada día'
        }
    ];
    
    let currentIndex = 0;
    
    // Cargar imágenes en la galería
    function loadGallery() {
        gallery.innerHTML = '';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.caption;
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.textContent = image.caption;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(caption);
            gallery.appendChild(galleryItem);
            
            // Evento para abrir imagen en modal
            galleryItem.addEventListener('click', function() {
                openModal(image.url, image.caption);
            });
        });
        
        updateGalleryCounter();
    }
    
    // Actualizar contador de galería
    function updateGalleryCounter() {
        currentImageSpan.textContent = currentIndex + 1;
        totalImagesSpan.textContent = images.length;
        
        // Mover galería a la imagen actual
        gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Botón anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGalleryCounter();
        createHearts(3);
    });
    
    // Botón siguiente
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGalleryCounter();
        createHearts(3);
    });
    
    // Inicializar galería
    loadGallery();
    
    // Swipe para móviles
    let startX = 0;
    gallery.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    gallery.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe izquierda - siguiente
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                // Swipe derecha - anterior
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            updateGalleryCounter();
        }
    });
}

// 4. Videos
function initVideos() {
    const videoContainer = document.getElementById('videoContainer');
    
    // Videos de ejemplo (reemplazar con tus propios videos)
    const videos = [
        {
            url: 'videos/video 1.mp4',
            caption: 'Nuestra primera fiesta juntos'
        },
        {
            url: 'videos/video 2.mp4',
            caption: 'Un abrazo que dice mucho'
        }
    ];
    
    // Cargar videos
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        
        const vid = document.createElement('video');
        vid.src = video.url;
        vid.controls = true;
        vid.preload = 'metadata';
        
        const caption = document.createElement('div');
        caption.className = 'video-caption';
        caption.textContent = video.caption;
        
        videoItem.appendChild(vid);
        videoItem.appendChild(caption);
        videoContainer.appendChild(videoItem);
    });
}

// 5. Reproductor de música
function initMusicPlayer() {
    const audioPlayer = document.getElementById('loveSong');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const prevSongBtn = document.getElementById('prevSongBtn');
    const nextSongBtn = document.getElementById('nextSongBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');
    const songTitle = document.getElementById('songTitle');
    const songList = document.getElementById('songList');
    
    // Lista de canciones (puedes agregar tus propias URLs)
    const songs = [
        {
            title: 'Canción del Amor',
            artist: 'Música romántica para ti',
            url: 'musica/musica 1.mp3'
        },
        {
            title: 'Melodía de Ensueño',
            artist: 'Para mi princesa',
            url: 'musica/musica 2.mp3'
        },
        {
            title: 'Beso de Amor',
            artist: 'Solo para ti',
            url: 'musica/musica 3.mp3'
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Cargar lista de canciones
    function loadSongList() {
        songList.innerHTML = '';
        
        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            if (index === currentSongIndex) songItem.classList.add('active');
            
            songItem.innerHTML = `
                <i class="fas fa-music"></i>
                <div>
                    <div class="song-item-title">${song.title}</div>
                    <div class="song-item-artist">${song.artist}</div>
                </div>
            `;
            
            songItem.addEventListener('click', function() {
                playSong(index);
            });
            
            songList.appendChild(songItem);
        });
    }
    
    // Reproducir canción
    function playSong(index) {
        currentSongIndex = index;
        const song = songs[currentSongIndex];
        
        audioPlayer.src = song.url;
        audioPlayer.load();
        
        songTitle.textContent = song.title;
        
        // Actualizar lista
        document.querySelectorAll('.song-item').forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Reproducir
        audioPlayer.play();
        isPlaying = true;
        updatePlayButton();
    }
    
    // Actualizar botón de play/pause
    function updatePlayButton() {
        const playIcon = playBtn.querySelector('i');
        if (isPlaying) {
            playIcon.className = 'fas fa-pause';
        } else {
            playIcon.className = 'fas fa-play';
        }
    }
    
    // Formatear tiempo
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Actualizar barra de progreso
    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration || 0;
        
        // Actualizar tiempos
        currentTimeSpan.textContent = formatTime(currentTime);
        totalTimeSpan.textContent = formatTime(duration);
        
        // Actualizar barra
        if (duration > 0) {
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
    }
    
    // Eventos del reproductor
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
        } else {
            audioPlayer.play();
            isPlaying = true;
        }
        updatePlayButton();
    });
    
    pauseBtn.addEventListener('click', function() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
    });
    
    prevSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
        createHearts(5);
    });
    
    nextSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
        createHearts(5);
    });
    
    volumeBtn.addEventListener('click', function() {
        audioPlayer.muted = !audioPlayer.muted;
        const volumeIcon = this.querySelector('i');
        volumeIcon.className = audioPlayer.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });
    
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });
    
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        
        if (audioPlayer.duration) {
            audioPlayer.currentTime = percent * audioPlayer.duration;
        }
    });
    
    // Eventos del audio
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    audioPlayer.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });
    
    audioPlayer.addEventListener('loadedmetadata', function() {
        totalTimeSpan.textContent = formatTime(audioPlayer.duration);
    });
    
    // Inicializar reproductor
    loadSongList();
    playSong(0);
    
    // Configurar volumen inicial
    audioPlayer.volume = volumeSlider.value / 100;
}

// 6. Efectos especiales
function initEffects() {
    const heartsEffectBtn = document.getElementById('heartsEffect');
    const messageEffectBtn = document.getElementById('messageEffect');
    const fireworksEffectBtn = document.getElementById('fireworksEffect');
    const secretMessage = document.getElementById('secretMessage');
    
    // Lluvia de corazones
    heartsEffectBtn.addEventListener('click', function() {
        createHearts(30);
        
        // Efecto visual en el botón
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Mensaje secreto
    messageEffectBtn.addEventListener('click', function() {
        secretMessage.classList.toggle('show');
        
        if (secretMessage.classList.contains('show')) {
            createHearts(10);
        }
        
        // Cambiar mensajes aleatorios
        const messages = [
            "Eres la persona más increíble que he conocido. Te amo más cada día.",
            "Cada momento a tu lado es un regalo que atesoro con todo mi corazón.",
            "Tu sonrisa es mi razón para sonreír cada mañana.",
            "Eres mi sueño hecho realidad, mi paz y mi felicidad.",
            "No hay estrella en el cielo que brille más que tu corazón."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        secretMessage.querySelector('p').textContent = randomMessage;
    });
    
    // Fuegos artificiales
    fireworksEffectBtn.addEventListener('click', function() {
        createFireworks();
        
        // Efecto visual en el botón
        this.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // Cambiar mensaje de amor aleatoriamente
    const loveMessage = document.getElementById('loveMessage');
    const loveMessages = [
        "Cada latido de mi corazón lleva tu nombre",
        "Eres mi hoy y todos mis mañanas",
        "Amarse el uno al otro es nuestro mayor logro",
        "Contigo el amor no tiene límites ni final",
        "Eres la respuesta a todas mis preguntas"
    ];
    
    // Cambiar mensaje cada 10 segundos
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loveMessages.length);
        loveMessage.textContent = loveMessages[randomIndex];
        loveMessage.style.animation = 'fadeInOut 2s';
        setTimeout(() => {
            loveMessage.style.animation = '';
        }, 2000);
    }, 10000);
}

// 7. Sistema de subida de archivos
function initUploads() {
    const imageUpload = document.getElementById('imageUpload');
    const videoUpload = document.getElementById('videoUpload');
    const uploadArea = document.getElementById('uploadArea');
    const videoUploadArea = document.getElementById('videoUploadArea');
    
    // Para imágenes
    uploadArea.addEventListener('click', function() {
        imageUpload.click();
    });
    
    imageUpload.addEventListener('change', function(e) {
        handleImageUpload(e.target.files);
    });
    
    // Para videos
    videoUploadArea.addEventListener('click', function() {
        videoUpload.click();
    });
    
    videoUpload.addEventListener('change', function(e) {
        handleVideoUpload(e.target.files);
    });
    
    // Arrastrar y soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        videoUploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
        videoUploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
        videoUploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        e.currentTarget.style.background = 'rgba(255, 249, 196, 0.8)';
        e.currentTarget.style.borderColor = '#FF8A65';
    }
    
    function unhighlight(e) {
        e.currentTarget.style.background = 'rgba(255, 249, 196, 0.3)';
        e.currentTarget.style.borderColor = '#FFB74D';
    }
    
    uploadArea.addEventListener('drop', handleDrop, false);
    videoUploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (e.currentTarget === uploadArea) {
            handleImageUpload(files);
        } else {
            handleVideoUpload(files);
        }
    }
}

function handleImageUpload(files) {
    // En una implementación real, aquí subirías las imágenes a un servidor
    // Por ahora, mostraremos un mensaje
    alert(`Has seleccionado ${files.length} imagen(es). En una versión real, se subirían al servidor.`);
    
    // Efecto visual
    createHearts(5);
}

function handleVideoUpload(files) {
    // En una implementación real, aquí subirías los videos a un servidor
    alert(`Has seleccionado ${files.length} video(s). En una versión real, se subirían al servidor.`);
    
    // Efecto visual
    createHearts(5);
}

// 8. Modal para imágenes
function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.getElementById('closeModal');
    
    function openModal(imageSrc, caption) {
        modalImage.src = imageSrc;
        modalCaption.textContent = caption;
        modal.classList.add('show');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Cerrar modal
    closeModal.addEventListener('click', closeModalFunc);
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
    
    // Exportar función para usar en otros lugares
    window.openModal = openModal;
}

// 9. Funciones de efectos visuales
function createHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤';
            
            // Posición aleatoria en la parte inferior
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${window.innerHeight}px`;
            
            // Tamaño aleatorio
            const size = 20 + Math.random() * 30;
            heart.style.fontSize = `${size}px`;
            
            // Color pastel aleatorio
            const pastelColors = [
                '#FF8A65',
                '#FFB74D',
                '#FFD54F',
                '#FFE082',
                '#FFF9C4'
            ];
            heart.style.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            
            // Rotación aleatoria
            const rotation = Math.random() * 360;
            heart.style.transform = `rotate(${rotation}deg)`;
            
            document.body.appendChild(heart);
            
            // Eliminar después de la animación
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

function createFireworks() {
    const fireworkCount = 5;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            // Crear fuego artificial
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Posición aleatoria
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            
            firework.style.left = `${x}px`;
            firework.style.top = `${y}px`;
            
            // Color aleatorio
            const colors = ['#FF8A65', '#FFB74D', '#FFD54F', '#FFE082', '#FFF9C4'];
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(firework);
            
            // Explosión
            setTimeout(() => {
                createParticles(x, y, firework.style.backgroundColor);
                firework.remove();
            }, 500);
            
            // Eliminar fuego artificial
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 300);
    }
}

function createParticles(x, y, color) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Velocidad y dirección aleatoria
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        document.body.appendChild(particle);
        
        // Animar partícula
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// 10. Efectos de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});