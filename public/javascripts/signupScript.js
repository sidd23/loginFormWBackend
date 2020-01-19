(function () {
    let abstractTag;

    let firstName = document.getElementById("firstName");
    let familyName = document.getElementById("familyName");
    let username = document.getElementById("usrname");
    let pswdInput = document.getElementById("pswd");
    let pswdConfirm = document.getElementById("pswdConfirm");
    let message = document.getElementById("message");
    let submit = document.getElementById("submitForm");

    let upLetter = document.getElementById("upLetter");
    let lowLetter = document.getElementById("lowLetter");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    // Password validation boolean flags
    let bUpperCaseChar = false;
    let bSmallCaseChar = false;
    let bDigit = false;
    let bLength = false;

    var validators = {
        lowerCaseLetters: /[a-z]/g,
        upperCaseLetters: /[A-Z]/g,
        numbers: /[0-9]/g,
        length: 8
    }

    class AbstractTag {
        addClass(tag, className) {
            tag.classList.add(className);
        }
        removeClass(tag, className) {
            tag.classList.remove(className)
        }
        addEvent(tag, event, callback) {
            tag.addEventListener(event, callback);
        }
    }

    // Check if password validators hold valid
    function validatePswd() {
        // Validate uppercase characters
        if (pswdInput.value.match(validators.upperCaseLetters)) {
            abstractTag.removeClass(upLetter, "invalid");
            abstractTag.addClass(upLetter, "valid");
            bUpperCaseChar = true;
        } else {
            abstractTag.removeClass(upLetter, "valid");
            abstractTag.addClass(upLetter, "invalid");
            bUpperCaseChar = false;
        }

        // Validate lowercase characters
        if (pswdInput.value.match(validators.lowerCaseLetters)) {
            abstractTag.removeClass(lowLetter, "invalid");
            abstractTag.addClass(lowLetter, "valid");
            bSmallCaseChar = true;
        } else {
            abstractTag.removeClass(lowLetter, "valid");
            abstractTag.addClass(lowLetter, "invalid");
            bSmallCaseChar = false;
        }

        // Validate numbers
        if (pswdInput.value.match(validators.numbers)) {
            abstractTag.removeClass(number, "invalid");
            abstractTag.addClass(number, "valid");
            bDigit = true;
        } else {
            abstractTag.removeClass(number, "valid");
            abstractTag.addClass(number, "invalid");
            bDigit = false;
        }

        // Validate length
        if (pswdInput.value.length >= validators.length) {
            abstractTag.removeClass(length, "invalid");
            abstractTag.addClass(length, "valid");
            bLength = true;
        } else {
            abstractTag.removeClass(length, "valid");
            abstractTag.addClass(length, "invalid");
            bLength = false;
        }
    }

    function ajax (url, method, data) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();
            req.open(method, url, true);
            req.responseType = 'text';
            req.setRequestHeader("Content-Type", "application/json");
            req.onreadystatechange = function() {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status === 200) {
                        resolve(req.responseText);
                    } else {
                        reject(req.statusText);
                    }
                }
            };
            
            req.onerror = function() {
                reject(Error("Network Error"));
            }

            req.send(data);
        });
    }

    // Validate input entered in password field
    var keyupCallback = function() {
        validatePswd();
    }

    // Display message when password input field is clicked
    var focusCallback = function() {
        message.style.display = "block";
    }

    // Hide message when user clicks outside password input field
    var blurCallback = function() {
        message.style.display = "none";
    }

    // var signUpCallback = function() {
    //     window.location.href = "http://localhost:3000/signup"
    // }

    // POST call to check if record exists when user logs in
    var submitCallback = function (event) {
        event.preventDefault();
        if ((bUpperCaseChar === false) || (bSmallCaseChar === false) || (bDigit === false) || (bDigit === false)) {
            alert("Invalid password. Select a valid password which meets the mentioned criteria!");
        }
        else if (pswdInput.value !== pswdConfirm.value) {
            alert("Please enter valid password confirmation value!");
        }
        else {
            let data = {
                'firstName': firstName.value,
                'familyName': familyName.value,
                'username': username.value,
                'password': pswdInput.value
            };
            ajax('http://localhost:3000/create', 'POST', JSON.stringify(data)).then(function (response) {
                console.log("POST call to /create status".concat(': ', response));
                
                if (response !== null) {
                    if (response === "username exists") {
                        alert("Username entered already exists. Please choose another username.");
                    }
                    else {
                        let redirectUrl = "http://localhost:3000/profile".concat('/', response.replace(/\"/g, ""));
                        window.location.replace(redirectUrl);
                    }
                }
            }, function (error) {
                // console.log("POST call to /create failed!", error);
                alert("Failed to log in! :(");
                next(error);
            });
        }
    }

    // Add required event listeners
    function eventListeners() {
        abstractTag.addEvent(pswdInput, 'keyup', keyupCallback);
        abstractTag.addEvent(pswdInput, 'focus', focusCallback);
        abstractTag.addEvent(pswdInput, 'blur', blurCallback);
        abstractTag.addEvent(submit, 'click', submitCallback);
        // abstractTag.addEvent(signUp, 'click', signUpCallback);
    }

    abstractTag = new AbstractTag();
    eventListeners();
})();