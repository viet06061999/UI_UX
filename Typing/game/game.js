$(document).ready(function () {

    var temp = document.getElementById('time');
    var menuHome = document.getElementById("menuHome");
    var button = document.getElementById("playBtn");
    var words = document.getElementById("words");
    var timerDiv = document.getElementById("time");
    var scoreDiv = document.getElementById("score");
    var scoreChange = document.getElementById("scoreChange");
    var wordCount = document.getElementById("wordCount");
    var mistakeCount = document.getElementById("mistakeCount");
    var nameInput = document.getElementById("nameInput");
    var startBtnReal = document.getElementById("startBtnReal");
    var topScoreBtn = document.getElementById("topScoreBtn");
    var backBtn = document.getElementById("backBtn");
    var exitBtn = document.getElementById("exitBtn");
    var gameHelpBtn = document.getElementById("gameHelpBtn");
    var gameHelpTable = document.getElementById("gameHelpTable");
    var frameImg = document.getElementById("frameImg");
    var topList = document.getElementById("topList");


    var playerName = "Giang";
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
    var wordList = JSON.parse(localStorage.getItem("wordList")) || [];
    var missList = JSON.parse(localStorage.getItem("missList")) || [];
    var countVideo = 1;
    var points = 0;
    var spans;
    var typed;
    var seconds = 60;
    var wordCountTmp = 0;
    var mistakeCountTmp = 0;

    var list1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '='];
    var list2 = ['A', 'E', 'I', 'U', 'Y','KH', 'B', 'C', 'K', 'Q', 'D', 'CH', 'G', 'GH', 'H', 'L', 'M', 'N', 'P', 'R', 'V', 'X', 'NG', 'P', 'T', 'C', 'CH', 'M', 'Y'];
    var list3 = ['XANH', 'CAM', 'LAM', 'DA', 'DAI', 'MEN', 'CON', 'CONG', 'MI', 'MIN', 'MINH', 'KEM', 'KENG', 'KEO', 'CUA', 'MOI', 'MONG', 'KHOAI', 'DOANH', 'HOA', 'HOANG', 'CHUA', 'QUANH', 'CHOAI', 'GIAM', 'GIANG', 'PHAO'];

    const list = ['A', 'E', 'I', 'U', 'Y','KH', 'B', 'C', 'K', 'Q', 'D', 'CH', 'G', 'GH', 'H', 'L', 'M', 'N', 'P', 'R', 'V', 'X', 'NG', 'P', 'T', 'C', 'CH', 'M', 'Y'];

    const helpDictionary = [//[từ, âm đầu, âm chính, âm cuối, âm đầu steno, âm chính steno, âm cuối steno]
        ['1', '', '1', '', '', '#S', ''],
        ['2', '', '2', '', '', '#K-', ''],
        ['3', '', '3', '', '', '#R-', ''],
        ['4', '', '4', '', '', '#N-', ''],
        ['5', '', '5', '', '', '#-H', ''],
        ['6', '', '6', '', '', '#-W', ''],
        ['7', '', '7', '', '', '#-J', ''],
        ['8', '', '8', '', '', '#-N', ''],
        ['9', '', '9', '', '', '#-T', ''],
        ['0', '', '0', '', '', '#O', ''],

        ['A', '', 'A', '', '', '-A', ''],
        ['E', '', 'E', '', '', '-E', ''],
        ['I', '', 'I', '', '', '*-I', ''],
        ['U', '', 'U', '', '', '-IU', ''],
        ['Y', '', 'Y', '', '', '-I', ''],
        ['KH', 'KH', '', '', 'KH', '', ''],
        ['B', 'B', '', '', 'P', '', ''],
        ['C', 'C', '', '', 'K', '', ''],
        ['K', 'K', '', '', 'K', '', ''],
        ['Q', 'Q', '', '', 'STK', '', ''],
        ['D', 'D', '', '', 'SP', '', ''],
        ['CH', 'CH', '', '', 'SK', '', ''],
        ['G', 'G', '', '', 'KP', '', ''],
        ['GH', 'GH', '', '', 'KP', '', ''],
        ['H', 'H', '', '', 'H', '', ''],
        ['L', 'L', '', '', 'SR', '', ''],
        ['M', 'M', '', '', 'RH', '', ''],
        ['N', 'N', '', '', 'PR', '', ''],
        ['P', 'P', '', '', 'SPH', '', ''],
        ['R', 'R', '', '', 'R', '', ''],
        ['V', 'V', '', '', 'SPR', '', ''],
        ['X', 'X', '', '', 'ST', '', ''],
        ['NG', 'NG', '', '', 'KR', '', ''],
        ['P', '', '', 'P', '', '', '-TK'],
        ['T', '', '', 'T', '', '', '-NT'],
        ['C', '', '', 'C', '', '', '-NK'],
        ['CH', '', '', 'CH', '', '', '-GK'],
        ['M', '', '', 'M', '', '', '-T'],
        ['Y', '', '', 'Y', '', '', '-JN'],


        ['XANH', 'X', 'A', 'NH', 'ST', '-A', 'K'],
        ['CAM', 'C', 'A', 'M', 'K', '-A', 'T'],
        ['LAM', 'L', 'A', 'M', 'SR', '-A', 'T'],
        ['DA', 'D', 'A', '', 'SP', '-A', ''],
        ['DAI', 'D', 'AI', '', 'SP', '-AJ', ''],
        ['MEN', 'M', 'E', 'N', 'RH', '-E', 'N'],
        ['CON', 'C', 'O', 'N', 'K', '-O', 'N'],
        ['CONG', 'K', 'O', 'NG', 'K', '-O', 'G'],
        ['MI', 'M', 'I', '', 'RH', '*-I', ''],
        ['MIN', 'M', 'I', 'N', 'RH', '*-I', 'N'],
        ['MINH', 'M', 'I', 'NH', 'RH', '*-I', 'K'],
        ['KEM', 'K', 'E', 'M', 'K', '-E', 'T'],
        ['KENG', 'K', 'E', 'NG', 'K', '-E', 'G'],
        ['KEO', 'K', 'E', 'O', 'K', '-E', 'JK'],
        ['CUA', 'K', 'UA', '', 'K', '-UO', ''],
        ['MOI', 'M', 'OI', '', 'RH', '-OI', ''],
        ['MONG', 'M', 'O', 'NG', 'RH', '-O', 'G'],
        ['KHOAI', 'KH', 'OA', 'I', 'KH', '-U', 'J'],
        ['DOANH', 'D', 'OA', 'NH', 'SP', '-U', 'K'],
        ['HOA', 'H', 'OA', '', 'H', '-U', ''],
        ['HOANG', 'H', 'OA', 'NG', 'H', '-U', 'G'],
        ['CHUA', 'CH', 'UA', '', 'SK', '-UO', ''],
        ['QUANH', 'Q', 'UA', 'NH', 'STK', '-U', 'K'],
        ['CHOAI', 'CH', 'OA', 'I', 'SK', '-U', 'J'],
        ['GIAM', 'G', 'IA', 'M', 'SH', '-A', 'T'],
        ['GIANG', 'G', 'IA', 'NG', 'SH', '-A', 'G'],
        ['PHAO', 'PH', 'A', 'O', 'PH', '-A', 'JK']
    ]

    function countdown() {
        points = 0;
        wordCountTmp = 0;
        mistakeCountTmp = 0;
        var timer = setInterval(function () {
            seconds--;
            temp.innerHTML = seconds;
            if (seconds === 0) {

                if(gameHelpTable.style.display === 'block') {
                    gameHelpTable.style.display = 'none';
                }
                gameHelpBtn.style.display = 'none';
                exitBtn.style.display = 'none';

                //handle result info
                topList.innerHTML = "";
                let p = document.createElement("p");
                p.innerHTML = "             KẾT QUẢ";
                topList.appendChild(p);
                let pScore = document.createElement("p");
                pScore.innerHTML = " - Điểm : " + points;
                topList.appendChild(pScore);
                let pWord = document.createElement("p");
                pWord.innerHTML = " - Từ : " + wordCountTmp;
                topList.appendChild(pWord);
                let pMis = document.createElement("p");
                pMis.innerHTML = " - Sai : " + mistakeCountTmp;
                topList.appendChild(pMis);
                topList.style.display = "block";
                frameImg.style.display = "block";
                backBtn.style.display = "block";
                
                scoreDiv.innerHTML = "0";
                wordCount.innerHTML = "0";
                mistakeCount.innerHTML = "0";
                scoreChange.innerHTML= "";
                words.innerHTML = "";
                menuHome.style.display = "block";
                clearInterval(timer);
                seconds = 60;
                timerDiv.innerHTML = "60";

                var player = new Array(playerName, points);
                scoreList.push(player);
                scoreList.sort(function(a, b){return b[1] - a[1]});
                if(scoreList.length>5) {
                    scoreList.pop();
                }
                localStorage.setItem("scoreList", JSON.stringify(scoreList));

                var playerWord = new Array(playerName, wordCountTmp);
                wordList.push(playerWord);
                wordList.sort(function(a, b){return b[1] - a[1]});
                if(wordList.length>5) {
                    wordList.pop();
                }
                localStorage.setItem("wordList", JSON.stringify(wordList));

                var playerMiss = new Array(playerName, mistakeCountTmp);
                missList.push(playerMiss);
                missList.sort(function(a, b){return b[1] - a[1]});
                if(missList.length>5) {
                    missList.pop();
                }
                localStorage.setItem("missList", JSON.stringify(missList));
                

                countVideo = 1;
                var videoDiv = document.getElementById("videoDiv");
                videoDiv.innerHTML = "";

                var video = document.createElement("video");
                video.setAttribute("autoplay", "");
                video.setAttribute("muted", "");
                video.setAttribute("loop", "");
                video.setAttribute("style", "border-radius: 5%;");
                video.setAttribute("id", "myVideo");
                videoDiv.appendChild(video);

                var source = document.createElement("source");
                source.setAttribute("src", "game/video/start_0.mp4");
                source.setAttribute("type", "video/mp4");
                video.appendChild(source);
            }
        }, 1000);
    }

    function random() {
        words.innerHTML = "";
        var random = Math.floor(Math.random() * (list.length-1)) + 0;
        var wordArray = list[random].split("");
        let  a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute('id', 'wordSpan');
        a.innerHTML = list[random];
        words.appendChild(a);
        for (var i = 0; i < wordArray.length; i++) { 
            var span = document.createElement("span");
            span.classList.add("span");
            span.innerHTML = wordArray[i];
            words.appendChild(span);
        }
        spans = document.querySelectorAll(".span");
    }

    
    

    //xử lý khi nhấn nút chơi ở trang chủ
    button.addEventListener("click", function (e) {
        document.getElementById('game_option').style.display = 'block';
        button.classList.remove('btn-main-game');
        startBtnReal.classList.add('btn-main-game');
        menuHome.style.display = "none";
    });

    //xử lý sau khi nhập tên và chọn chế độ chơi
    startBtnReal.addEventListener("click", function (e) {
        if(nameInput.value.length > 1) {
            playerName = nameInput.value;
        }
        
        document.getElementById('game_option').style.display = 'none';
        gameHelpBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        startBtnReal.classList.remove('btn-main-game');
        backBtn.classList.add('btn-main-game');

        var ele = document.getElementsByName('drone');//chọn chế độ chơi
        var game_option = 2;
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            game_option = ele[i].value; 
        } 
        if(game_option == '1') {
            let listLength = list.length;
            for(let i=0 ; i<listLength ; i++) {
                list.pop();
            }
            for(let i=0 ; i<list1.length ; i++) {
                list.push(list1[i]);
            }
        } else if(game_option == '2') {
            let listLength = list.length;
            for(let i=0 ; i<listLength ; i++) {
                list.pop();
            }
            for(let i=0 ; i<list2.length ; i++) {
                list.push(list2[i]);
            }
        } else if (game_option == '3') {
            let listLength = list.length;
            for(let i=0 ; i<listLength ; i++) {
                list.pop();
            }
            for(let i=0 ; i<list3.length ; i++) {
                list.push(list3[i]);
            }
        }
        
        countdown();
        random();
    });

    //xử lý khi người dùng chọn trợ giúp trong game
    gameHelpBtn.addEventListener("click", function(e) {
        var wordSpan = document.getElementById('wordSpan').innerText;
        for(let i=0 ; i<helpDictionary.length ; i++) {
            if(helpDictionary[i][0] == wordSpan) {
                document.getElementById('cell11').innerHTML = helpDictionary[i][1];
                document.getElementById('cell12').innerHTML = helpDictionary[i][2];
                document.getElementById('cell13').innerHTML = helpDictionary[i][3];
                document.getElementById('cell21').innerHTML = helpDictionary[i][4];
                document.getElementById('cell22').innerHTML = helpDictionary[i][5];
                document.getElementById('cell23').innerHTML = helpDictionary[i][6];
            }
        }
        // document.getElementById('cell11').innerHTML = "11";
        if(gameHelpTable.style.display === 'block') {
            gameHelpTable.style.display = 'none';
        } else {
            gameHelpTable.style.display = 'block';
        }
    });

    exitBtn.addEventListener("click", function(e) {
        seconds = 1;
    });

    //xử lý BXH trang chủ
    topScoreBtn.addEventListener("click", function (e) {
        menuHome.style.display = "none";
        frameImg.style.display = "block";
        getTopList(topList, scoreList, " điểm");
        topList.style.display = "block";
        backBtn.style.display = "block";
        button.classList.remove('btn-main-game');
        backBtn.classList.add('btn-main-game');
    });
    document.getElementById("topWordBtn").addEventListener("click", function (e) {
        menuHome.style.display = "none";
        frameImg.style.display = "block";
        getTopList(topList, wordList, " từ/phút");
        topList.style.display = "block";
        backBtn.style.display = "block";
        button.classList.remove('btn-main-game');
        backBtn.classList.add('btn-main-game');
    });
    document.getElementById("topMissBtn").addEventListener("click", function (e) {
        menuHome.style.display = "none";
        frameImg.style.display = "block";
        getTopList(topList, missList, " lỗi/phút");
        topList.style.display = "block";
        backBtn.style.display = "block";
        button.classList.remove('btn-main-game');
        backBtn.classList.add('btn-main-game');
    });

    backBtn.addEventListener("click", function (e) {
        menuHome.style.display = "block";
        topList.style.display = "none";
        frameImg.style.display = "none";
        backBtn.style.display = "none";
        backBtn.classList.remove('btn-main-game');
        button.classList.add('btn-main-game');
    });


    function typing(e) {
        if(e.which == 13) {
            document.getElementsByClassName('btn-main-game')[0].click();
            return;
        }

        if(e.which<48 || e.which>111) {
            return;
        }
        typed = String.fromCharCode(e.which);

        var isMistake = false;
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML === typed) { 
                if (spans[i].classList.contains("bg")) { 
                    continue;
                } else if (spans[i].classList.contains("bg") === false && spans[i - 1] === undefined || spans[i - 1].classList.contains("bg") !== false) { 
                    
                    spans[i].classList.add("bg");
                    break;
                } 
            } else if (!(spans[i].innerHTML === typed) && !(spans[i].classList.contains("bg"))) {
                isMistake = true;
                if(countVideo>1) {
                    var videoDiv = document.getElementById("videoDiv");
                    let j=0;
                    while(videoDiv.childNodes.length != j) {
                        if(videoDiv.childNodes[j].tagName != 'VIDEO') {
                            videoDiv.removeChild(videoDiv.childNodes[j]);
                        } else {
                            j++;
                        }
                    }

                    var oldVideo = document.getElementById('myVideo');
                    oldVideo.removeAttribute('id');
                    oldVideo.setAttribute('style','position: absolute;top:-1;border-radius: 5%;');
    
                    var video = document.createElement("video");
                    video.setAttribute("autoplay", "");
                    video.setAttribute("muted", "");
                    video.setAttribute("style", "border-radius: 5%;");
                    video.setAttribute("id", "myVideo");
                    videoDiv.appendChild(video);
    
                    var source = document.createElement("source");
                    source.setAttribute("src", "game/video/fail_" + (countVideo - 1) + ".mp4");
                    source.setAttribute("type", "video/mp4");
                    video.appendChild(source);

                    if(videoDiv.childNodes.length>2) {
                        videoDiv.removeChild(videoDiv.childNodes[0]);
                    }
                }

                
            }
        }
        if(isMistake) {
            mistakeCountTmp++;
            mistakeCount.innerHTML = mistakeCountTmp;

            scoreChange.setAttribute("style", "color: red;");
            scoreChange.innerHTML = " (-10) ";
            points = points - 10; 
            scoreDiv.innerHTML = points; 
        }


        //PASS a word
        var checker = 0;
        for (var j = 0; j < spans.length; j++) { 
            if (spans[j].className === "span bg") {
                checker++;
            }
            if (checker === spans.length) { 
                words.classList.add("animated");
                words.classList.add("fadeOut");
                scoreChange.setAttribute("style", "color: lime;");
                scoreChange.innerHTML = " (+50) ";
                points = points + 50; 
                scoreDiv.innerHTML = points; 
                wordCountTmp++;
                wordCount.innerHTML = wordCountTmp;
                document.removeEventListener("keydown", typing, false);
                setTimeout(function () {
                    words.className = "words"; 
                    random(); 
                    document.addEventListener("keydown", typing, false);
                }, 400);

                var videoDiv = document.getElementById("videoDiv");
                let j=0;
                while(videoDiv.childNodes.length != j) {
                    if(videoDiv.childNodes[j].tagName != 'VIDEO') {
                        videoDiv.removeChild(videoDiv.childNodes[j]);
                    } else {
                        j++;
                    }
                }

                var oldVideo = document.getElementById('myVideo');
                oldVideo.removeAttribute('id');
                oldVideo.setAttribute('style','position: absolute;top:-1;border-radius: 5%;');

                var video = document.createElement("video");
                video.setAttribute("autoplay", "");
                video.setAttribute("muted", "");
                video.setAttribute("style", "border-radius: 5%;");
                video.setAttribute("id", "myVideo");
                videoDiv.appendChild(video);

                var source = document.createElement("source");
                source.setAttribute("src", "game/video/pass_" + countVideo + ".mp4");
                source.setAttribute("type", "video/mp4");
                video.appendChild(source);

                if(videoDiv.childNodes.length>2) {
                    videoDiv.removeChild(videoDiv.childNodes[0]);
                }

                if (countVideo < 4) {
                    countVideo++;
                }

                if(gameHelpTable.style.display === 'block') {
                    gameHelpTable.style.display = 'none';
                }
            }

        }
    }

    function getTopList(parent, topArray, type) {
        parent.innerHTML = "";
        for(let i=0 ; i<topArray.length ; i++) {
            let contentRow = (i+1) + " . " + topArray[i][0] + " - " + topArray[i][1] + " " + type;
            let p = document.createElement("p");
            parent.appendChild(p);

            let span = document.createElement("span");
            span.innerHTML = contentRow;
            p.appendChild(span);
        }
        
    }

    document.addEventListener("keydown", typing, false);

});