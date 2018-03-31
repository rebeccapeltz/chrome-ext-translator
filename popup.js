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
        // axios
        //     .get("https://translate.yandex.net/api/v1.5/tr.json/translate?", {
        //         params: {
        //             key: "trnsl.1.1.20180331T023954Z.fb19b766eeb0f17b.94b94b49cb3e1b4fd6be44e59b76e99d819bf342",
        //             text: fromText,
        //             lang: "en" + "-" + "es",
        //             format: "plain"
        //         }
        //     })
        //     .then(response => {
        //         console.log(response.data.text[0]);
        //         validateResponse(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

//////////
  let key= encodeURIComponent("trnsl.1.1.20180331T023954Z.fb19b766eeb0f17b.94b94b49cb3e1b4fd6be44e59b76e99d819bf342");
  let text = encodeURIComponent(fromText);
  let lang = encodeURIComponent("en-es");
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