 // Плавный скролл к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Добавление класса активной секции при скролле
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Слайдер
        document.addEventListener('DOMContentLoaded', function() {
            const sliderImages = document.getElementById('sliderImages');
            const dots = document.querySelectorAll('.slider-dot');
            const imageCount = 3;
            let currentIndex = 0;
            
            // Функция для обновления слайдера
            function updateSlider(index) {
                sliderImages.style.transform = `translateX(-${index * 100}%)`;
                
                // Обновление активного индикатора
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Автоматическое переключение каждые 5 секунд
            function autoSlide() {
                currentIndex = (currentIndex + 1) % imageCount;
                updateSlider(currentIndex);
            }
            
            // Установка интервала для автоматического переключения
            const intervalId = setInterval(autoSlide, 5000);
            
            // Добавление событий клика на точки
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    clearInterval(intervalId); // Остановка автоматического переключения при взаимодействии пользователя
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateSlider(currentIndex);
                    // Перезапуск автоматического переключения через 10 секунд после взаимодействия
                    setTimeout(() => {
                        clearInterval(intervalId);
                        setInterval(autoSlide, 5000);
                    }, 10000);
                });
            });
            
            // Обработка формы заказа
            document.getElementById('orderForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            });
        });
