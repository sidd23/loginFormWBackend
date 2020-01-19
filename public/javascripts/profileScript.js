(function () {

    function setWelcomeMessage() {
        let params = (new URL(document.location)).searchParams;
        let name = params.get("username");

        if (name !== null) {
            let welcome = document.getElementById("welcomeStr");
            let welcomeMsg = "Hi".concat(' ', name);
            welcome.innerHTML = welcomeMsg;
        }
    }

    setWelcomeMessage();
})();