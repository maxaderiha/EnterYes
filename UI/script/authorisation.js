"use strict";

var username = null;

var userModel = (function () {
    var users = [
        {
            "username": "maxim",
            "password": "1292071"
        }
    ];

    function checkForLogIn(name, password) {
        if (name && password && typeof name === "string" && typeof password === "string") {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === name && users[i].password === password)
                    return true;
            }
            return false;
        }
        else {
            return false
        }
    }

    return {
        checkForLogIn: checkForLogIn
    }
}());

function logIn() {
    var name = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    if (userModel.checkForLogIn(name, password)) {
        username = name;
        setScroll();
        reloadNews();
        mainPage();
    }
    else
        document.querySelector(".incorrect-input").style.visibility = "visible";
}

function addUserUI() {
    if (username) {
        document.getElementById("log-in").className = "fa fa-sign-out";
        document.querySelector(".name").innerHTML = username;
        document.querySelector(".add-news-button").style.display = "block";
        var arr = document.getElementsByClassName("button");
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = "block";
        }
    } else {
        document.getElementById("log-in").className = "fa fa-sign-in";
        document.querySelector(".add-news-button").style.display = "none";
        var arr = document.getElementsByClassName("button");
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = "none";
        }
        document.querySelector(".name").innerHTML = "";
    }
}
