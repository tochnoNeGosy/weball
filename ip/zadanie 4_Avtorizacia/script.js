document.getElementById('username').addEventListener('input', function() {
    const username = this.value;
    const usernameError = document.getElementById('usernameError');
    if (username.length < 6) {
        usernameError.textContent = 'Имя пользователя должно содержать не менее 6 символов';
    } else {
        usernameError.textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const passwordError = document.getElementById('passwordError');
    if (password.length < 6) {
        passwordError.textContent = 'Пароль должен содержать не менее 6 символов';
    } else {
        passwordError.textContent = '';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');

    // Проверяем данные
    if (username.length >= 6 && password.length >= 6) {
        Swal.fire({
            icon: 'success',
            title: 'Успешный вход',
            text: 'Вы успешно вошли в систему!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Имя пользователя и пароль должны содержать не менее 6 символов.'
        });
    }
});
