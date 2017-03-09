function validation() {
    if (localStorage.getItem("firstUse")) {
        alert("first use");
        return true;
    }
    else {
        if (localStorage.getItem("accessDate")) {
            var lastDate = localStorage.getItem("accessDate");
            var lastHardware = localStorage.getItem("accessHardware");

            var myDate = Date.parse(Date()) / 1000;
            var myHardware = navigator.userAgent;

            if (lastHardware == myHardware && lastDate < myDate - 598) {
                alert("OK");
                return true;
            }
            else {
                alert("your plugin was blocked");
                blockPlugin();
                return false;
            }
        }
        else {
            //blockButtons();
            alert("Blocked");
            return false;
        }
    }
}

function activate() {
    if (!localStorage.getItem("LicenseKey")) {
        enterKey();
        reqManager();
        interval = window.setInterval(reqManager, 600000);
    }
}

function enterKey() {
    var key = prompt("Enter license key", "");
    localStorage.setItem("LicenseKey", key);

}

var interval;
if (localStorage.getItem("LicenseKey")) {
    reqManager();
    interval = window.setInterval(reqManager, 600000);
}

function reqManager() {
    if (localStorage.getItem("LastTime")) {
        if (localStorage.getItem("LastTime") < Date.parse(Date()) - 598){
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
            var myArr = JSON.parse(req.responseText);
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
            }
            else {
                alert("wrong key");
                localStorage.removeItem("LicenseKey");
            }
        }
        request.send();
    }
}

function blockPlugin() {
    $('#buttons').hide();
}