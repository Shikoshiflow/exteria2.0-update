// Мобильное меню
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрыть мобильное меню
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});


// Убедимся, что mailto: ссылки работают нормально
document.querySelectorAll('a[href^="mailto:"]').forEach(mailLink => {
    mailLink.addEventListener('click', function (e) {
        // Не блокируем стандартное поведение для mailto: ссылок
        e.stopPropagation(); // Останавливаем всплытие события
    });
});

// Анимация появления элементов
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Проверка при загрузке и прокрутке
window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);

// Обработка формы
const form = document.getElementById('inquiry-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получение данных из формы
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Здесь будет код для отправки формы на сервер
    // Например, с использованием fetch API
    
    // Пример: 
    /*
    fetch('https://your-server.com/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, 
            company,
            email,
            phone,
            service,
            message
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Показать уведомление об успешной отправке
    })
    .catch((error) => {
        console.error('Error:', error);
        // Показать уведомление об ошибке
    });
    */
    
    // Временное решение: просто показать уведомление
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    form.reset();
});

// Неоновые эффекты при наведении
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('neon-border');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('neon-border');
    });
});

// Обработка загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    console.log('Страница полностью загружена');
    
    // Проверяем, есть ли якорь в URL
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});

// Дополнительная функция для обработки прокрутки страницы
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Изменение навигационной панели при прокрутке
    if (scrollPosition > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Функция для определения видимости элемента в области просмотра
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
// JavaScript для слайдера изображений с 22 фотографиями
document.addEventListener('DOMContentLoaded', function() {
    initImageSlider();
});

function initImageSlider() {
    const slider = document.querySelector('.hero-image-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slider-img');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const slidesContainer = slider.querySelector('.slider-images');
    
    // Элементы счетчика
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let progressBar;
    
    // Устанавливаем общее количество слайдов в счетчике
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides;
    }
    
    // Создаем индикатор прогресса
    function createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'slider-progress';
        
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        progressContainer.appendChild(progressBar);
        slider.appendChild(progressContainer);
        
        return progressBar;
    }
    
    // Обновляем индикатор прогресса
    function updateProgressBar(duration = 5000) {
        if (!progressBar) {
            progressBar = createProgressBar();
        }
        
        // Сбрасываем прогресс
        progressBar.style.width = '0%';
        
        // Анимируем прогресс
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    }
    
    // Создаем миниатюры (если нужно)
    function createThumbnails() {
        // Создаем контейнер для миниатюр если нет слишком много изображений
        if (totalSlides <= 10) { // Ограничиваем количество миниатюр
            const thumbnailsContainer = document.createElement('div');
            thumbnailsContainer.className = 'slider-thumbnails';
            
            slides.forEach((slide, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.className = index === 0 ? 'thumbnail active' : 'thumbnail';
                thumbnail.src = slide.src;
                thumbnail.alt = 'Миниатюра ' + (index + 1);
                thumbnail.dataset.index = index;
                
                thumbnail.addEventListener('click', () => {
                    goToSlide(index);
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
            
            slider.appendChild(thumbnailsContainer);
        }
    }
    
    // Функция для предзагрузки изображений
    function preloadImages() {
        // Предзагружаем следующие 3 изображения
        for (let i = 1; i <= 3; i++) {
            const nextIndex = (currentIndex + i) % totalSlides;
            const img = new Image();
            img.src = slides[nextIndex].src;
        }
    }
    
    // Функция для переключения на следующий слайд
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        preloadImages();
    }
    
    // Функция для переключения на предыдущий слайд
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        preloadImages();
    }
    
    // Функция для переключения на указанный слайд
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        preloadImages();
    }
    
    // Обновление состояния слайдера
    function updateSlider() {
        // Обновление активного класса для слайдов
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Обновление счетчика слайдов
        if (currentSlideEl) {
            currentSlideEl.textContent = currentIndex + 1;
        }
        
        // Обновление активной миниатюры, если они есть
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails.length > 0) {
            thumbnails.forEach((thumb, index) => {
                if (index === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
            
            // Прокручиваем к активной миниатюре
            const thumbnailsContainer = document.querySelector('.slider-thumbnails');
            if (thumbnailsContainer) {
                const activeThumb = thumbnailsContainer.querySelector('.thumbnail.active');
                if (activeThumb) {
                    thumbnailsContainer.scrollLeft = activeThumb.offsetLeft - (thumbnailsContainer.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
                }
            }
        }
        
       // Обновляем индикатор прогресса
        updateProgressBar();
        
        // Перезапуск автопрокрутки
        resetAutoplay();
    }
    
    // Запуск автопрокрутки
    function startAutoplay() {
        autoplayInterval = setInterval(goToNextSlide, 5000); // Меняем слайд каждые 5 секунд
    }
    
    // Остановка и перезапуск автопрокрутки
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Добавляем клавиатурную навигацию
    document.addEventListener('keydown', function(e) {
        // Проверяем, видим ли слайдер в области видимости
        const rect = slider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        }
    });
    
    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', function() {
        goToPrevSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        goToNextSlide();
    });
    
    // Обработчики для свайп-жестов
    slidesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Минимальное расстояние для регистрации свайпа
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            goToNextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            goToPrevSlide();
        }
    }
    
    // Остановка автопрокрутки при наведении мыши
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        startAutoplay();
    });
    
    // Создаем миниатюры и индикатор прогресса
    createThumbnails();
    createProgressBar();
    
    // Инициализация слайдера
    updateSlider();
    startAutoplay();
    preloadImages(); // Предзагружаем следующие изображения
}
