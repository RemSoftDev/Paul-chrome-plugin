var Comments;
var LikesCom;



var zxc = function () {
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(newscript);
}

chrome.browserAction.onClicked.addListener(function (tab) {
    
    var start = setInterval(function () { scrolla() }, 10);

});

$(window).ready(function () {


});



function count() {
    if (true) {
        chrome.tabs.executeScript(null, { file: "content-scripts/popup.js" });
    }
}

function coment()
{
    if (validation()) {
        chrome.tabs.executeScript(null, { file: "content-scripts/comment.js" });
    }
}

function golikes() {
    if (true) {
        chrome.tabs.executeScript(null, { file: "content-scripts/golike.js" });
    }
    //alert(navigator.userAgent);
	setTimeout(privateLikesMessage, 5000);
	
}

function privateLikesMessage() {
	chrome.tabs.executeScript(null, { code:"var result = document.location.href; if (result.indexOf('?sk=likes') < 0 && result.indexOf('&sk=likes') < 0 && result.indexOf('/likes') < 0) { alert('Private likes'); }"});
}

function skip() {
    if (validation()) {
        chrome.tabs.executeScript(null, { file: "content-scripts/skip.js" });
    }
}

function breakComment() {
    if (validation()) {
        chrome.tabs.executeScript(null, { file: "content-scripts/ifBrakeComment.js" });
    }
    
}


window.onload = function () {
    
    localStorage.setItem("ifBrakeUsers", false);

    document.getElementById('do-count').onclick = count;

    //document.getElementById('comment').onclick = coment;

    document.getElementById('golikes').onclick = golikes;

    //document.getElementById('skip').onclick = skip;

    //document.getElementById('BreakComment').onclick = breakComment;

    //document.getElementById('activation-button').onclick = activate;

    //window.setInterval(function () { chrome.tabs.executeScript(null, { file: "content-scripts/rewriteStorage.js" }) }, 300000);

    //if (localStorage.getItem("LicenseKey")) {
    //    unblockButtons();
    //}
    //else {
	//	blockButtons();
    //}
}


function download(filename, a) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(a));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//Next code has a lot of bugs

function validation() {
    if (localStorage.getItem("firstUse")) {
        
        return true;
    }
    else {
        if (localStorage.getItem("accessDate")) {
            var lastDate = localStorage.getItem("accessDate");
            var lastHardware = localStorage.getItem("accessHardware");

            var myDate = Date.parse(Date()) / 1000;
            var myHardware = navigator.userAgent;

            if (lastDate < myDate - 598) {
                
                return true;
            }
            else {
                alert("your plugin was blocked");
				localStorage.removeItem("LicenseKey");
                return false;
            }
        }
        else {
            //blockButtons();
            
            return false;
        }
    }
}

function activate() {
    debugger
    if (!localStorage.getItem("LicenseKey")) {
        enterKey();
        reqManager();
        interval = window.setInterval(reqManager, 600000);
    }
    else {
        reqManager();
        interval = window.setInterval(reqManager, 600000);
    }
}

function enterKey() {
    //var key = prompt("Enter license key", "");
    var key = document.getElementById("code-box").value;
	$('#status').css('display', 'block');
	localStorage.clear();
    localStorage.setItem("LicenseKey", key);
}

var interval;
if (localStorage.getItem("LicenseKey")) {
    reqManager();
    interval = window.setInterval(reqManager, 600000);
}

function reqManager() {
    if (localStorage.getItem("LastTime")) {
        if (localStorage.getItem("LastTime") < (Date.parse(Date()))/1000 - 598) {
            httpRequest();
        }
    }
    else {
        httpRequest();
    }
}

function httpRequest() {
    if (localStorage.getItem("LicenseKey")) {
        var user_agent = navigator.userAgent;
        var ip = "1.1.1.1";
        var key = localStorage.getItem("LicenseKey");

        var request = new XMLHttpRequest();
        var url = "http://www.fbistool.com/check.php?key=" + key + "&ip_address=" + ip + "&user_agent=" + user_agent;

        request.open('GET', url);
        request.onload = function () {
            var myArr = JSON.parse(request.responseText);
            localStorage.setItem("accessStatus", myArr.status);
            if (myArr.status == "success") {
                if (myArr.created) {
                    localStorage.removeItem("firstUse");
                    localStorage.setItem("accessDate", myArr.created);
                    localStorage.setItem("accessHardware", myArr.user_agent);
                    localStorage.setItem("accessIp", myArr.ip);
                }
                else {
                    localStorage.setItem("firstUse", "true");
                }
                localStorage.setItem("LastTime", Date.parse(Date()) / 1000);
				unblockButtons();
				$('#code-box').prop('value', '');
            }
            else {
                
                localStorage.removeItem("LicenseKey");
            }
        }
        request.send();
    }
}

function blockPlugin() {
    $('#buttons').hide();
}

function blockButtons() {
	$('#do-count').prop('disabled', true);

    $('#comment').prop('disabled', true);

    $('#golikes').prop('disabled', true);

    $('#skip').prop('disabled', true);

    $('#BreakComment').prop('disabled', true);
}

function unblockButtons() {
    $('#do-count').prop('disabled', false);

    $('#comment').prop('disabled', false);

    $('#golikes').prop('disabled', false);

    $('#skip').prop('disabled', false);

    $('#BreakComment').prop('disabled', false);
}

function unblockPlugin() {
    $('#activation-button').prop('disabled', 'false');
    localStorage.clear();
}