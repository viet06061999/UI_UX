const firstDictionary = [['C','K',''],['B','P',''],['D','S','P'],['CH','S','P'],['G','K','P'],['L','S','R'],['M','S','K'],['NH','S','K'],['GI','S','K'],['GH','K','S']];
const mainDictionary = [['O','O',''],['Ơ','W',''],['ƯƠ','E','W'],['IỀ','I','E'],['A','O','U'],['OA','H','W'],['I','H','I'],['U','H','I'],['A','H','I'],['E','H','I']];
const lastDictionary = [['N','N',''],['I','J',''],['NG','N','I'],['U','J','K'],['N','J','T'],['N','J','T'],['N','Y','J'],['NG','Y','J'],['N','Y','J'],['P','Y','J']];
var currentIndex = 0;
var currentWord = document.getElementById('practiceWord');
currentWord.innerHTML = firstDictionary[currentIndex][0]+mainDictionary[currentIndex][0]+lastDictionary[currentIndex][0];
var myBar = document.getElementById("myBar");
var widthBar = 0;
var tempBar = 0;
var idBar;
var result = [];
var modal = document.getElementById("myModal");
var resultModal = 0;
var am = 1;
function changeBar() {
    if(widthBar >= tempBar) {
        clearInterval(idBar);
    } else {
        widthBar++;
        myBar.setAttribute('style',getBackgroundBar() + 'width:' + widthBar + '%');
        // myBar.style.width = widthBar + "%";
        myBar.innerHTML = widthBar + "%";
        if(widthBar == 100) {
            setTimeout(function () {
                let divResultModal = document.createElement('div');
                divResultModal.setAttribute('style', 'color: #466ddc; font-size: 29px;font-weight: 600;')
                divResultModal.setAttribute('class', 'text-center');
                divResultModal.innerHTML = 'Kết quả : ' + resultModal + '/10 điểm \<br\/> Tốc độ : 45 từ/phút ';
                document.getElementById('resultModal').appendChild(divResultModal);
                document.getElementById('openModal').click();
            }, 500);
        }
    }
}

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

function stenoToNormal(code) {
    var convertList = [['Q','S'],['W','K'],['E','R'],['R','N'],['T','H'],['U','*'],['I','W'],['O','J'],['P','N'],['219','T'],['{[','T'],
    ['A','T'],['S','P'],['D','H'],['F','N'],['G','S'],['J','I'],['K','Y'],['L','J'],['186','N'],['222','K'],['32',' '],['C','U'],['V','O'],
    ['N','E'],['M','A']];
    
    for(let i=0 ; i<convertList.length ; i++) {
        if(code.charCodeAt(0) == convertList[i][1].charCodeAt(0)) {
            return convertList[i][0];
        }
    }
    return null;
}

function firstchar(e){
    var key = getKey(e);
    if(currentIndex<2) {
        if(firstDictionary[currentIndex][1].charCodeAt(0) == normalToSteno(e).charCodeAt(0)) {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;');
                }
            }
            nextWord(true);
        } else {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;');
                }
                
            }
        }
    } else {
        if(normalToSteno(e).charCodeAt(0) != keyPressed[0] &&
        (firstDictionary[currentIndex][1].charCodeAt(0) == normalToSteno(e).charCodeAt(0) ||
        firstDictionary[currentIndex][2].charCodeAt(0) == normalToSteno(e).charCodeAt(0))) {
            keyPressed.unshift(normalToSteno(e).charCodeAt(0));
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;');
                }
            }
            if(keyPressed.length == 2) {
                nextWord(true);
            }
        } else {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;');
                }
                
            }
        }
    }
}

var keyPressed = []; 
document.body.addEventListener('keydown', function (e) {
    let array = [];
    if(am==1){
        array= firstDictionary;
    } else if(am==2){
        array = mainDictionary;
    } else if (am==3){
        array = lastDictionary;
    }
    var key = getKey(e);
    if(currentIndex<2) {
        if(array[currentIndex][1].charCodeAt(0) == normalToSteno(e).charCodeAt(0)) {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;');
                }
            }
            nextWord();
        } else {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;');
                }
                
            }
        }
    } else {
        if(normalToSteno(e).charCodeAt(0) != keyPressed[0] &&
        (array[currentIndex][1].charCodeAt(0) == normalToSteno(e).charCodeAt(0) ||
        array[currentIndex][2].charCodeAt(0) == normalToSteno(e).charCodeAt(0))) {
            keyPressed.unshift(normalToSteno(e).charCodeAt(0));
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #197aff;color: white;');
                }
            }
            if(keyPressed.length == 2) {
                nextWord();
            }
        } else {
            for(let i=0 ; i<key.length ; i++) {
                if (!key[i]) {
                    return console.warn('No key for', e.keyCode);
                }
            
                key[i].setAttribute('data-pressed', 'on');
                if(key[i].getAttribute('style') == 'margin-left: 20px;') {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;margin-left: 20px;');
                } else {
                    key[i].setAttribute('style', 'background-color: #ff1919;color: white;');
                }
                
            }
        }
    }
    
    
});

document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    if(normalToSteno(e).charCodeAt(0) == keyPressed[0] ){
        keyPressed.pop();
    };
    for(let i=0 ; i<key.length ; i++) {
        key[i] && key[i].removeAttribute('data-pressed');
        if(key[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
           key[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
            key[i].setAttribute('style', 'margin-left: 20px;');
        } else {
            key[i].setAttribute('style', '');
        }
        
    }
    
});

function getBackgroundBar() {
    if(result.length==0) return '';
    
    let unit = 100/(result.length);
    let colorString = '' + getColorBarUnit(result[0]) + ' ' + unit + '%';
    if(result.length>1) {
        for(let i=1 ; i<result.length ; i++) {
            colorString += ', ' + getColorBarUnit(result[i]) + ' ' + (unit*i) + '%';
            colorString += ', ' + getColorBarUnit(result[i]) + ' ' + (unit*(i+1)) + '%';
        }
    } else {
        colorString += ', ' + getColorBarUnit(result[0]) + ' ' + unit + '%';
    }
    return 'background:linear-gradient(to right,' + colorString + ');';
    

}

function getColorBarUnit(check) {
    if(check){
        return '#4CAF50';
    } else {
        return '#e05d5d';
    }

}

function nextWord() {
    if(am==3) {
        am=1;
        nextWordP(true);
    } else {
        am++;
    }
    if(keyPressed.length>0) {
        keyPressed.pop();
    }
}

function nextWordP(isCorrect) {
    
    if(tempBar < 100) {
        tempBar = tempBar + 10;
        if(isCorrect) {
            result.push(true);
            resultModal++;
        } else {
            result.push(false);
        }
        // myBar.setAttribute('style',getBackgroundBar());
        idBar = setInterval(changeBar, 60);
    } else {
        
    }
    if(currentIndex==9) {
        currentIndex = 0;
    } else {
        currentIndex++;
        currentWord.innerHTML = firstDictionary[currentIndex][0]+mainDictionary[currentIndex][0]+lastDictionary[currentIndex][0];
    }
    if(keyPressed.length>0) {
        keyPressed.pop();
    }
}
function suggOver(x) {
    x.setAttribute('style', 'margin-left: 16px;border-radius: 20px;background-color: #00ff33;width: 77px;padding: 6px;');
    var key1 = getKeyByCode(stenoToNormal(firstDictionary[currentIndex][1]));
    for(let i=0 ; i<key1.length ; i++) {
        key1[i].setAttribute('data-pressed', 'on');
        if(key1[i].getAttribute('style') == 'margin-left: 20px;') {
            key1[i].setAttribute('style', 'background-color: #FFCC33;color: white;margin-left: 20px;');
        } else {
            key1[i].setAttribute('style', 'background-color: #2bc119;color: white;');
        }
    }
    if(currentIndex>1) {
        var key2 = getKeyByCode(stenoToNormal(firstDictionary[currentIndex][2]));
        for(let i=0 ; i<key2.length ; i++) {key2[i].setAttribute('data-pressed', 'on');
            if(key2[i].getAttribute('style') == 'margin-left: 20px;') {
                key2[i].setAttribute('style', 'background-color: #2bc119;color: white;margin-left: 20px;');
            } else {
                key2[i].setAttribute('style', 'background-color: #2bc119;color: white;');
            }
        }
    }

    var key3 = getKeyByCode(stenoToNormal(mainDictionary[currentIndex][1]));
    for(let i=0 ; i<key3.length ; i++) {
        key3[i].setAttribute('data-pressed', 'on');
        if(key3[i].getAttribute('style') == 'margin-left: 20px;') {
            key3[i].setAttribute('style', 'background-color: #3399CC		;color: white;margin-left: 20px;');
        } else {
            key3[i].setAttribute('style', 'background-color: #3399CC		;color: white;');
        }
    }
    if(currentIndex>1) {
        var key4 = getKeyByCode(stenoToNormal(mainDictionary[currentIndex][2]));
        for(let i=0 ; i<key4.length ; i++) {key4[i].setAttribute('data-pressed', 'on');
            if(key4[i].getAttribute('style') == 'margin-left: 20px;') {
                key4[i].setAttribute('style', 'background-color: #3399CC		;color: white;margin-left: 20px;');
            } else {
                key4[i].setAttribute('style', 'background-color: #3399CC		;color: white;');
            }
        }
    }

    var key5 = getKeyByCode(stenoToNormal(lastDictionary[currentIndex][1]));
    for(let i=0 ; i<key5.length ; i++) {
        key5[i].setAttribute('data-pressed', 'on');
        if(key5[i].getAttribute('style') == 'margin-left: 20px;') {
            key5[i].setAttribute('style', 'background-color: #FFCC33;color: white;margin-left: 20px;');
        } else {
            key5[i].setAttribute('style', 'background-color: #FFCC33;color: white;');
        }
    }
    if(currentIndex>1) {
        var key6 = getKeyByCode(stenoToNormal(lastDictionary[currentIndex][2]));
        for(let i=0 ; i<key6.length ; i++) {key6[i].setAttribute('data-pressed', 'on');
            if(key6[i].getAttribute('style') == 'margin-left: 20px;') {
                key6[i].setAttribute('style', 'background-color: #FFCC33;color: white;margin-left: 20px;');
            } else {
                key6[i].setAttribute('style', 'background-color: #FFCC33;color: white;');
            }
        }
    }

}

function suggOut(x) {
    x.setAttribute('style', 'margin-left: 16px;border-radius: 20px;background-color: #d5f7ff;width: 77px;padding: 6px;');

    var key1 = getKeyByCode(stenoToNormal(firstDictionary[currentIndex][1]));
    for(let i=0 ; i<key1.length ; i++) {
        key1[i] && key1[i].removeAttribute('data-pressed');
        if(key1[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
           key1[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
            key1[i].setAttribute('style', 'margin-left: 20px;');
        } else {
            key1[i].setAttribute('style', '');
        }
    }
    if(currentIndex>1) {
        var key2 = getKeyByCode(stenoToNormal(mainDictionary[currentIndex][2]));
        for(let i=0 ; i<key2.length ; i++) {
            key2[i].setAttribute('data-pressed', 'on');
            key2[i] && key1[i].removeAttribute('data-pressed');
            if(key2[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
            key2[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
                key2[i].setAttribute('style', 'margin-left: 20px;');
            } else {
                key2[i].setAttribute('style', '');
            }
        }
    }
    var key1 = getKeyByCode(stenoToNormal(mainDictionary[currentIndex][1]));
    for(let i=0 ; i<key1.length ; i++) {
        key1[i] && key1[i].removeAttribute('data-pressed');
        if(key1[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
           key1[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
            key1[i].setAttribute('style', 'margin-left: 20px;');
        } else {
            key1[i].setAttribute('style', '');
        }
    }
    if(currentIndex>1) {
        var key2 = getKeyByCode(stenoToNormal(lastDictionary[currentIndex][2]));
        for(let i=0 ; i<key2.length ; i++) {
            key2[i].setAttribute('data-pressed', 'on');
            key2[i] && key1[i].removeAttribute('data-pressed');
            if(key2[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
            key2[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
                key2[i].setAttribute('style', 'margin-left: 20px;');
            } else {
                key2[i].setAttribute('style', '');
            }
        }
    }
    var key1 = getKeyByCode(stenoToNormal(lastDictionary[currentIndex][1]));
    for(let i=0 ; i<key1.length ; i++) {
        key1[i] && key1[i].removeAttribute('data-pressed');
        if(key1[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
           key1[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
            key1[i].setAttribute('style', 'margin-left: 20px;');
        } else {
            key1[i].setAttribute('style', '');
        }
    }
    if(currentIndex>1) {
        var key2 = getKeyByCode(stenoToNormal(firstDictionary[currentIndex][2]));
        for(let i=0 ; i<key2.length ; i++) {
            key2[i].setAttribute('data-pressed', 'on');
            key2[i] && key1[i].removeAttribute('data-pressed');
            if(key2[i].getAttribute('style') == 'background-color: #197aff;color: white;margin-left: 20px;' ||
            key2[i].getAttribute('style') == 'background-color: #ff1919;color: white;margin-left: 20px;') {
                key2[i].setAttribute('style', 'margin-left: 20px;');
            } else {
                key2[i].setAttribute('style', '');
            }
        }
    }
}

function size () {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
}

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
    size();
});
size();