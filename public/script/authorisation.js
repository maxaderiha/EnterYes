"use strict";
let username = null;

let userModel = (function () {
    let users = [
        {
            "username": "maxim",
            "password": "1292071"
        }
    ];

    function checkForLogIn(name, password) {
        if (name && password && typeof name === "string" && typeof password === "string") {
            if (users.some(function (element) {
                    if (element.username === name && element.password === password) {
                        localStorage.setItem("username", element.username);
                        return true;
                    }

                })) {
                return true;
            }
        }
        else {
            return false;
        }
    }

    return {
        checkForLogIn: checkForLogIn
    }
}());

function logIn() {
    let name = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    if (userModel.checkForLogIn(name, password)) {
        //setScroll();
        closeAuthorizationPage();
        addUserUI();
    }
    else {
        document.querySelector(".incorrect-input").style.visibility = "visible";
    }
}

function addUserUI() {
    username = localStorage.getItem("username");
    let buttonsDv = document.querySelector(".buttons-dw");
    if (username) {
        document.getElementById("log-in").className = "fa fa-sign-out";
        document.querySelector(".name").innerHTML = username;
        document.querySelector(".add-news-button").style.display = "block";
        let arr = document.getElementsByClassName("button");
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.display = "block";
        }
        if (buttonsDv) buttonsDv.style.display = "block";

    } else {
        document.getElementById("log-in").className = "fa fa-sign-in";
        document.querySelector(".add-news-button").style.display = "none";
        let arr = document.getElementsByClassName("button");
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.display = "none";
        }
        document.querySelector(".name").innerHTML = "";
        if (buttonsDv) buttonsDv.style.display = "none";
    }
}
