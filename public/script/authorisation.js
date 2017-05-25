'use strict';

function logIn() {
    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    requestModel.logIn({username, password}).then(
        () => {
            closeAuthorizationPage();
            addUserUI();
        },
        () => {
            document.querySelector('.incorrect-input').style.visibility = 'visible';
        });
}

function addUserUI() {
    const buttonsDv = document.querySelector('.buttons-dw');
    requestModel.getUserName().then(
        (username) => {
            document.getElementById('log-in').className = 'fa fa-sign-out';
            document.querySelector('.icon-in').title = 'Выйти';
            document.querySelector('.name').innerHTML = username;
            document.querySelector('.add-news-button').style.display = 'block';
            const arr = document.getElementsByClassName('button');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'block';
            }
            if (buttonsDv) buttonsDv.style.display = 'block';
        },
        () => {
            document.getElementById('log-in').className = 'fa fa-sign-in';
            document.querySelector('.icon-in').title = 'Войти';
            document.querySelector('.add-news-button').style.display = 'none';
            const arr = document.getElementsByClassName('button');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'none';
            }
            document.querySelector('.name').innerHTML = '';
            if (buttonsDv) buttonsDv.style.display = 'none';
        });
}
