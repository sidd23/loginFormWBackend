(function () {
    let abstractTag;
    let username = document.getElementById("usrname");
    let pswdInput = document.getElementById("pswd");
    let submit = document.getElementById("submitForm");
    let signUp = document.getElementById("signUp");

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

    var signUpCallback = function() {
        window.location.replace("http://localhost:3000/signup");
    }

    var submitCallback = function(event) {
        event.preventDefault();
        let data = {
            'username': username.value,
            'password': pswdInput.value
        };
        ajax('http://localhost:3000/check', 'POST', JSON.stringify(data)).then(function(response) {
            console.log("POST call to /check status".concat(': ', response));

            if (response == null) {
                alert("User record/document does not exist!");
            }
            else {
                let redirectUrl = "http://localhost:3000/profile".concat('/', response.replace(/\"/g, ""));
                window.location.replace(redirectUrl);
            }
        }, function(error) {
            console.log("POST call to /check failed!", error);
            alert("Failed to log in! :(");
        });
    }

    // Add required event listeners
    function eventListeners() {
        abstractTag.addEvent(submit, 'click', submitCallback);
        abstractTag.addEvent(signUp, 'click', signUpCallback);
    }

    abstractTag = new AbstractTag();
    eventListeners();
})();