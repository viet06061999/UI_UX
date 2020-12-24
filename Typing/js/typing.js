const demoContent =  ['xin ','chào ','đây ','là ','nhóm ','HCI ','17 \n','cần ','cù ','bù ','siêng ','lăng '];
var currentIndex = 0;
var textLeft = document.getElementById("textleft");
var textRight = document.getElementById("textright");
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");


function getKey (e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        selector = [
            '[data-key="' + code + '"]',
            '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    
    return document.querySelectorAll(selector);
}

function getKeyByCode (code) {
    selector = [
        '[data-key="' + code + '"]',
        '[data-char*="' + encodeURIComponent(code) + '"]'
    ].join(',');
    
    return document.querySelectorAll(selector);
}

function pressKey (char) {
    var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed', 'on');
    key.setAttribute('style', 'background-color: #0c6ff0;');
    setTimeout(function () {
        key.removeAttribute('data-pressed');
        key.removeAttribute('style', 'background-color: #0c6ff0;');
    }, 200);
}

function normalToSteno(e) {
    var convertList = [['Q','S'],['W','K'],['E','R'],['R','N'],['T','H'],['U','*'],['I','W'],['O','J'],['P','N'],['219','T'],['{[','T'],
    ['A','T'],['S','P'],['D','H'],['F','N'],['G','S'],['J','I'],['K','Y'],['L','J'],['186','N'],['222','K'],['32',' '],['C','U'],['V','O'],
    ['N','E'],['M','A']];
    var code = e.keyCode || e.which;
    for(let i=0 ; i<convertList.length ; i++) {
        if(convertList[i][0] == code || convertList[i][0] == String.fromCharCode(code)) {
            return convertList[i][1];
        } 
    }
    return null;
}

var keyPressed = []; 
var countKeyPressCrr = 0;
document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    for(let i=0 ; i<key.length ; i++) {
        key[i].setAttribute('data-pressed', 'on');
        if(key[i].getAttribute('style') == 'margin-left: 20px;') {
            key[i].setAttribute('style', 'background-color: #197aff;color: white;margin-left: 20px;');
        } else {
            key[i].setAttribute('style', 'background-color: #197aff;color: white;');
        }
    }

    countKeyPressCrr ++;
    if(normalToSteno(e) != null) {
        
        keyPressed.push(normalToSteno(e));    
        console.log(normalToSteno(e));
        console.log(keyPressed.length);   
    }
});

document.body.addEventListener('keyup', function (e) {
    countKeyPressCrr--;
    var key = getKey(e);
    for(let i=0 ; i<key.length ; i++) {
        key[i] && key[i].removeAttribute('data-pressed');
        if(key[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
           key[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
            key[i].setAttribute('style', 'margin-left: 20px;');
        } else {
            key[i].setAttribute('style', '');
        }
        
    }
    
    if(countKeyPressCrr==0) {
        let textTemp = "";
        for(let i=0 ; i<keyPressed.length ; i++) {
            textTemp = textTemp + keyPressed[i];
        }
        console.log(textTemp);
        if(textTemp.length != 0) {
            textRight.innerHTML = " " + minutesLabel.innerHTML + " : " + secondsLabel.innerHTML + '    -    ' + textTemp + "\n" + textRight.innerHTML;
            textLeft.innerHTML = textLeft.innerHTML + demoContent[currentIndex];
            currentIndex++;
            if(currentIndex==demoContent.length) currentIndex=0;
        }
        
        
        let keyPrLg = keyPressed.length;
        for(let i=0 ; i<keyPrLg ; i++) {
            keyPressed.pop();
        } 
    }
});

function size () {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
}

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
    size();
});
size();