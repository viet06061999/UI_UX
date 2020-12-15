
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

var handler = function (e) { 
    handler.data.push(e);
    console.log(handler.data);
}
handler.data = [];

// function recordClickKeyboard() {
//     console.log(window.addEventListener("keydown",  handler));
// }

// recordClickKeyboard();

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

//hide keyboard
function hide() {
    var keyboard = document.getElementById("keyboardWrapper");
    if (keyboard.style.display === "none") {
        keyboard.style.display = "flex";
    } else {
        keyboard.style.display = "none";
    }
}

function nextWord() {
    var word = document.getElementById("practiceWord");
    if ( word.innerHTML == "A"){
        word.innerHTML = "B"
    }else{
        word.innerHTML = "A"
    }
}

