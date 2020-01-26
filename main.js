const app = () => {
    let currentEditValue = document.querySelector("input#name").value;
    const randomMessages = [
        "Wait, did you just try to inspect element?",
        "No, that is not allowed! Keyloggers are listening",
        "What are you doing?!",
        "Inspect element is wrong, you shouldn't do that.",
        "Don't try to change the value! You should restart!"
    ];

    const alphabet = "abcdefghijklmanoprstuvwxyzáéíóú";

    const createErrorMessage = (str = undefined) => {
        let randomMessage = str;
        if(randomMessage == undefined) {
           randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        }

        let errorElement = document.querySelector("#errorMessage");

        if(!errorElement) {
            errorElement = new HTMLParagraphElement();
            errorElement.style.display = "none";
            errorElement.style.color = "red";
            errorElement.id = "errorMessage";
            document.querySelector(".colMain").appendChild(errorElement);
        }

        errorElement.innerHTML = randomMessage;
        errorElement.style.display = "block";
        errorElement.style.color = "red";
        window.setTimeout((errorElement) => {
            errorElement.style.display = "none";
        }, 2000, errorElement);
    };

    const generateRandomAlphabet = () => {
        const letterBox = document.querySelector("#letter");
        let funnyAlphabet = "";

        if(letterBox.options.length > 0) {
            for(let option in letterBox.options) {
                letterBox.options.remove(option);
            }
        }

        while (funnyAlphabet.length < alphabet.length) {
            funnyAlphabet = funnyAlphabet + alphabet[Math.floor(Math.random() * alphabet.length)];
        } 

        for(let i = 0 ; i < funnyAlphabet.length ; i++) {
            if(Array.from(letterBox.options).includes(funnyAlphabet[i])) continue;

            let option = new Option(funnyAlphabet[i], funnyAlphabet[i], false, false);
            letterBox.appendChild(option);
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        generateRandomAlphabet();
    });

    document.querySelector("#appender").addEventListener("click", () => {
        const letterBox = document.querySelector("#letter");
        const letter = letterBox.value;
    
        const editBox = document.querySelector("input#name");

        generateRandomAlphabet();
        if(editBox.value == undefined) {
            editBox.value = letter;
            return true;
        }
        editBox.value = editBox.value + letter;
        currentEditValue = editBox.value;
        return true;
    });

    document.querySelector("#sender").addEventListener("click", () => {
        const editBox = document.querySelector("input#name");
        if(editBox.value.length <= 0) {
            createErrorMessage("No! You haven't typed your name!");
            return false;
        }
        //I want this to be as bad as possible... soooo.....
        document.write(`Thank you, ${editBox.value}. <a style="color: blue; text-decoration: underline; font-weight: bold;" onclick="window.location.reload(true);">Typed a wrong name? Reset.</a>`);
    });

    document.querySelector("#backall").addEventListener("click", () => {
        document.querySelector("input#name").value = "";
        generateRandomAlphabet();
    });

    document.querySelector("#backone").addEventListener("click", () => {
        document.querySelector("input#name").value = document.querySelector("input#name").value.replace(/.$/, "");
        generateRandomAlphabet();
    });

    //Gotta check for that leet hacker that wants to break it. >:(
    window.setInterval(() => {
        const input = document.querySelector("input#name");
        const letterBox = document.querySelector("#letter");
        if(input === undefined) input = document.querySelector("input[type=text]");

        if(!input.getAttribute("readonly")) {
            input.setAttribute("readonly", "true");
            createErrorMessage();
        }

        if(!input.getAttribute("disabled")) {
            input.setAttribute("disabled", "true");
            createErrorMessage();
        }

        if(!letterBox.classList.contains("xtraSecurity3000")) {
            letterBox.classList.add("xtraSecurity3000");
            createErrorMessage("Hey, don't. That's for security!");
        }

    }, 50);
};

app();