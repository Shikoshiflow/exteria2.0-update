// JavaScript для обработки формы с помощью EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация EmailJS с вашим ID пользователя
    emailjs.init("service_raa52sw"); // Замените на ваш User ID из EmailJS
    
    const form = document.getElementById('inquiry-form');
    const statusMessage = document.getElementById('status-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    // Функция валидации email
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Функция валидации телефона (базовая)
    function isValidPhone(phone) {
        return phone.replace(/\D/g, '').length >= 10;
    }
    
    // Функция для отображения статуса
    function showStatus(type, message) {
        statusMessage.className = 'status-message ' + type;
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        statusMessage.classList.add('fade-in-up');
        
        // Удаляем класс анимации после завершения
        setTimeout(() => {
            statusMessage.classList.remove('fade-in-up');
        }, 500);
    }
    
    // Функция для переключения состояния кнопки
    function toggleButtonState(isLoading) {
        if (isLoading) {
            buttonText.style.opacity = '0';
            buttonLoader.style.display = 'block';
            submitButton.disabled = true;
        } else {
            buttonText.style.opacity = '1';
            buttonLoader.style.display = 'none';
            submitButton.disabled = false;
        }
    }
    
    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Валидация полей формы
        const email = form.querySelector('#email').value;
        const phone = form.querySelector('#phone').value;
        
        if (!isValidEmail(email)) {
            showStatus('error', 'Пожалуйста, введите корректный email адрес.');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showStatus('error', 'Пожалуйста, введите корректный номер телефона.');
            return;
        }
        
        // Показываем состояние загрузки
        showStatus('loading', 'Отправка заявки...');
        toggleButtonState(true);
        
        // Дополнительные данные для EmailJS
        const templateParams = {
            from_name: form.querySelector('#name').value,
            site_name: 'ИмпортПро',
            date: new Date().toLocaleDateString('ru-RU')
        };
        
        // Отправляем форму через EmailJS
        emailjs.sendForm(
            'service_raa52sw',      // ID сервиса EmailJS
            'template_cy8c54u',     // ID шаблона EmailJS
            form,
            templateParams
        )
        .then(function(response) {
            console.log('Успешно отправлено!', response);
            showStatus('success', 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
            form.reset();
            
            // Прокрутка к сообщению об успехе
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function(error) {
            console.error('Ошибка!', error);
            showStatus('error', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние через 2 секунды
            setTimeout(() => {
                toggleButtonState(false);
            }, 2000);
        });
    });
    
    // Добавляем маску для телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' : '') + x[4];
    });
});