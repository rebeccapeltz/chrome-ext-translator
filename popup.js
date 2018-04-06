function validateResponse(response) {
    if (response.code === 422) {
        console.log("Could not translate text please try again later");
    } else if (response.code === 413) {
        console.log("Please enter a shorter text to translate");
    } else if (response.code === 200) {
        document.getElementById("to-text").value = response.text[0];
    } else {
        console.log("Cannot translate at this moment please try again later");
    }
}

function translateSpeak(text) {
    responsiveVoice.speak(text);
}

function responseSpeak(text) {
    responsiveVoice.speak(text);
}

document.addEventListener("DOMContentLoaded", event => {
    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault();
        let fromText = document.getElementById("from-text").value;
        let langFromVal = document.getElementById("lang-from-select").value;
        let langToVal = document.getElementById("lang-to-select").value;

        let key = encodeURIComponent(config.KEY);
        let text = encodeURIComponent(fromText);
        let langFrom = encodeURIComponent(langFromVal);
        let langTo = encodeURIComponent(langToVal);
        let lang = encodeURIComponent(`${langFrom}-${langTo}`); 
        let format = encodeURIComponent("plain");
        fetch(
                `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}&format=${format}`
            )
            .then(response => {
                //test for error
                response.json().then(function (data) {
                    validateResponse(data);
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    });
    document.getElementById("from-text-speak").addEventListener("click", function (event) {
        let fromText = document.getElementById("from-text").value;
        responseSpeak(fromText);
    });
    document.getElementById("to-text-speak").addEventListener("click", function (event) {
        let fromText = document.getElementById("to-text").value;
        responseSpeak(fromText);
    });
})