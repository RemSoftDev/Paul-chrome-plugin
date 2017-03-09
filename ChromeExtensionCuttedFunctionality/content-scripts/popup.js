var number = localStorage.getItem("count");

var newNumber = parseInt(number) + 1;
var href = localStorage.getItem(newNumber);
debugger
if (localStorage.getItem("lastElement") == newNumber) {
    localStorage.removeItem("count");
    alert(localStorage.getItem("lastElement"));
    alert("Finish");
    localStorage.clear();
}

localStorage.setItem("count", newNumber);

localStorage.removeItem(number);

if (document.location.href.indexOf("?sk=likes") > -1 || document.location.href.indexOf("&sk=likes") > -1 || document.location.href.indexOf("/likes") > -1) {
    var searchRequest = prompt("Search in likes", "").split(",");
	var windowHeight = [];
	windowHeight[0] = 0;
	var i = 1;
    var d = setInterval(function () {
		windowHeight[i] = document.body.scrollHeight;
		window.scrollTo(0, windowHeight[i]);
		if (i==20) {
			
			if (windowHeight[1] == windowHeight[10]){
				
				clearInterval(d);
				abc();
			}
			else{
				
				i = 0;
			}
		}
		
        i++;
    }, 500);

	function abc() {
        //clearInterval(d);
		//alert("test2");
        var x = document.getElementsByClassName("fsl fwb fcb");
        var y = document.title;

        var string = [].map.call(x, function (node) {
            for (var i = 0; i <= searchRequest.length; i++) {
                var searchReq = String(searchRequest[i]);//.toLocableLowerCase();
                searchReq = searchReq.toLowerCase();
                var compareTextReg = String(node.textContent);//.match(new RegExp(searchReq, "i"));//.toLocableLowerCase();
                compareTextReg = compareTextReg.toLowerCase();
                if (compareTextReg.indexOf(searchReq) > -1) {
                    //return node.textContent || node.innerText || "\r\n";
                    return node.textContent + "\r\n";
                }
                //if (compareTextReg != null) {
                //    if (compareTextReg.length > 1) {
                //        return node.textContent + "\r\n";
                //    }
                //}
            }
            
        }).join("");
		
		if (string != ""){
			download(y + " - " + new Date() + "LIKES.txt", string);
		}
		else{
			alert("No likes found");
		}
        
        

        if (href != null) {
            window.open(href);
        }

        window.close();
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

}
else {
    alert("Go to likes first");
}