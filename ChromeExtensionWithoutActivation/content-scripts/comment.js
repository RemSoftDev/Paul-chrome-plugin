
var toggleComments = function () {
    localStorage.setItem("ifBrakeComment", false);
    var yourName = "";
    var m = window.location.href;
    var n = m.lastIndexOf("/");
    var res1 = m.substring(0, n);
    var n1 = res1.lastIndexOf("/");
    var res = res1.substring(n1 + 1);
    var out = "";
    var xmlhttp = new XMLHttpRequest();
    var strCookie = document.cookie;
    var indexStrCookie = strCookie.lastIndexOf("/");
    var resStrCookie = strCookie.substring(0, indexStrCookie);
    var indexStrCookie2 = resStrCookie.lastIndexOf("/");
    var resToken = resStrCookie.substring(indexStrCookie2 + 1);
    var search;
    var countOfChekeComment = 0;
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
	//var storage = [];
	//var index = 0;
    if (resToken.length > 5) {
        search = prompt("Search in comments", "").split(',');

    }

    var url = "https://graph.facebook.com/v2.5/" + res + "/comments?limit=500&access_token=" + resToken + "";
    function FRecurs(nexUrl) {
        var xmlhttpNex = new XMLHttpRequest();
        xmlhttpNex.onreadystatechange = function () {

            if (xmlhttpNex.readyState == 4) {
                if (xmlhttpNex.status == 200) {

                    var myArr1 = JSON.parse(xmlhttpNex.responseText);
                    countOfChekeComment = countOfChekeComment + myArr1.data.length
                    
                    myWindow.document.write("<span id='myspan'></span>");

                    myWindow.document.write('<script>document.getElementById("myspan").textContent="count checked comment = ' + countOfChekeComment + '";<\/script>');

                    localStorage.setItem("ChecedComent", myArr1.data.length);
                    
                    for (var i = 0; i < search.length; i++) {
                        //if (localStorage.getItem("ifBrakeComment")) break;

                        myFunction(myArr1.data, search[i]);

                    }

                    try {
                        
                        if (myArr1.paging.next != null && localStorage.getItem("ifBrakeComment") != "true") {
                            FRecurs(myArr1.paging.next);
                        }
                        else {

                            alert(" Find  - " + counterWind + " result ");

                            var element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(out));
                            element.setAttribute('download', search + " - " + new Date() + ".json");

                            element.style.display = 'none';
                            document.body.appendChild(element);

                            element.click();

                            document.body.removeChild(element);
							
							//myWindow.document.write("<span id='myspan'></span>");

                    		//myWindow.document.write('<script>document.getElementById("myspan").textContent="Local Storage Writing";<\/script>');
							//for (var i = 0; i<index; i++) {
							//	setTimeout(function(){localStorage.setItem(i, storage[i]);}, 500);
							//}


                            localStorage.setItem("count", 0);

                            var number = localStorage.getItem("count");

                            localStorage.setItem("lastElement", counterWind);

                            window.open(localStorage.getItem(0));

                            window.close();
                        }
                    }
                    catch (err) {
                        alert(err);
                    }
                }
                else {

                    document.cookie = "/" + prompt("Token", "") + "/";
                }
            }
        };

        xmlhttpNex.open("GET", nexUrl, true);
        xmlhttpNex.send();

    };

    FRecurs(url);
    var counterWind = 0;
    var isNewWindow = false;
    function myFunction(arr, searchFun) {
        var i;


        for (i = 0; i < arr.length; i++) {
            arr[i].display;
            var searchReq = String(searchFun).toLowerCase();
            var target = arr[i].message;
            var compareText = String(target).toLowerCase();
            if (compareText.indexOf(searchReq) > -1) {
                out += JSON.stringify(arr[i].from);
                document.cookie += arr[i].from.id;
                //FLike("tsn.ua");
                FLike(arr[i].from.id, counterWind);
                counterWind++;
            }
        }
    };


    function FLike(id, numb) {

        var req = new XMLHttpRequest();
        req.open('GET', "https://www.facebook.com/" + id, false);
        req.send(null);
        if (req.status == 200) {
            if (req.responseURL.indexOf("?") > -1) {
                var urlById = req.responseURL + "&sk=likes";
            }
            else {
                var urlById = req.responseURL + "?sk=likes";
            }
			//storage[index] = urlById;
			//index++;
            
			localStorage.setItem(numb, urlById);

        }
    };
};
setInterval(function () { chrome.tabs.executeScript(null, { file: "content-scripts/rewriteStorage.js" }) }, 300000);
toggleComments();