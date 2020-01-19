(function(){
    var rickRoll = document.getElementById("rickRoll");
    var signUp = document.getElementById("signUp");
    var login = document.getElementById("login");

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

    var rickRollCallback = function() {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    };

    var signUpCallback = function() {
        window.location.href = "http://localhost:3000/signup";
    };

    var loginCallback = function() {
        window.location.href = "http://localhost:3000/login"
    };

    // Add required event listeners
    function eventListeners() {
        abstractTag.addEvent(rickRoll, 'click', rickRollCallback);
        abstractTag.addEvent(signUp, 'click', signUpCallback);
        abstractTag.addEvent(login, 'click', loginCallback);
    }

    abstractTag = new AbstractTag();
    eventListeners();
})();