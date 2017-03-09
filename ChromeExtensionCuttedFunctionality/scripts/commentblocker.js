
var Comments;
var LikesCom;

var zxc = function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
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


chrome.browserAction.onClicked.addListener(function (tab) {

  chrome.tabs.executeScript(tab.id, {
    code: "(" + toggleComments.toString() + ")();"
  });
  
  
});
var toggleComments = function() {
    var yourName = "";
    yourName = prompt("Search in comments", "");
    alert(yourName);
	
	var m = window.location.href;
	
    var n = m.lastIndexOf("/");

    var res1 = m.substring(0,n);

	var n1 = res1.lastIndexOf("/");
    var res = res1.substring(n1+1);
			alert(res);

var search = yourName;
var out = "";
var xmlhttp = new XMLHttpRequest();

var strCookie = document.cookie;

    var indexStrCookie = strCookie.lastIndexOf("/");

    var resStrCookie = strCookie .substring(0,indexStrCookie  );

    var indexStrCookie2 = resStrCookie .lastIndexOf("/");

    var resToken = resStrCookie.substring(indexStrCookie2 +1);
			
alert(resToken );


var url ="https://graph.facebook.com/v2.5/"+res+"/comments?limit=500&access_token="+resToken+"";



function FRecurs(nexUrl) {

var xmlhttpNex = new XMLHttpRequest();

xmlhttpNex.onreadystatechange = function() {
    if (xmlhttpNex.readyState == 4) {
    if ( xmlhttpNex.status == 200) {
        var myArr1 = JSON.parse(xmlhttpNex.responseText);

        myFunction(myArr1.data);
	
try {

if(myArr1.paging.next != null)
{
FRecurs(myArr1.paging.next);
}
else
{ 
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(out));
  element.setAttribute('download', +new Date() +".json");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

}
catch(err) {

 alert(err);

}

}
else
{

document.cookie = "/" + prompt("Token", "")+ "/";

}
}

};

xmlhttpNex.open("GET", nexUrl, true);
xmlhttpNex.send();


};

FRecurs(url);


function myFunction(arr) {
    var i;
    for(i = 0; i < arr.length; i++) {
        arr[i].display;

if(arr[i].message.indexOf(search) > -1)
{
        out += JSON.stringify(arr[i].from);

//FLike("tsn.ua");
FLike(arr[i].from.id );

}
    }
}


function FLike(id) {

var xmlhttpLikes = new XMLHttpRequest();
var urlLikes ="https://graph.facebook.com/v2.4/"+id+"/likes?access_token=" + resToken + "";



xmlhttpLikes.onreadystatechange = function() {
    if (xmlhttpLikes.readyState == 4 && xmlhttpLikes.status == 200) {
        var myArrLikes = JSON.parse(xmlhttpLikes.responseText)+",";
        myFunctionLikes(myArrLikes.data);
    }
};
xmlhttpLikes.open("GET", urlLikes, false);
xmlhttpLikes.send();

function myFunctionLikes(arrLikes) {
    var outLikes = "";
    var iLikes;
    for(iLikes = 0; iLikes < arrLikes.length; iLikes++) {

        outLikes += JSON.stringify(arrLikes[iLikes]);

    }
 out +=outLikes+",";
}
}

	//-------------------------------------------------------------

   window.location.href = "https://www.facebook.com/dinansrule/likes";
 //location.reload(true);



	//var x = document.getElementsByClassName("fsl fwb fcb");

	//var string = [].map.call(x, function (node) {
   //     return node.textContent || node.innerText || "";
   // }).join("");	
	

	
var d = setInterval(function() {

	window.scrollTo(0,document.body.scrollHeight);
}, 1000);

  alert( 'стоп' );

// через 5 сек остановить повторы
setTimeout(function() {
  clearInterval(d);
  alert( 'стоп' );
}, 10000);
	

//input.type = 'text';
//input.name = 'valuer';
//input.value = 'reogtrkiittttttttttttttttttttttttttireieiieifkkfkkdkdk';
//document.body.appendChild(input);

  //(document.getElementById("extension") == null) ?
  //  (
  //    extensionLink = document.createElement("link"),
  //    extensionLink.href = chrome.extension.getURL("/styles/commentblocker_on.css"),
  //    extensionLink.id = "extension",
  //    extensionLink.type = "text/css",
  //    extensionLink.rel = "stylesheet",
  //    document.getElementsByTagName("head")[0].appendChild(extensionLink)
  //  )
  //: (document.getElementsByTagName("head")[0].removeChild(document.getElementById("extension")))
};