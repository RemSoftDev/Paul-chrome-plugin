var windowHeight = [];
windowHeight[0] = 0;
var i = 1;
var d = setInterval(function () {
	windowHeight[i] = document.body.scrollHeight;
	window.scrollTo(0, windowHeight[i]);
	if (i==20) {
		
		if (windowHeight[1] == windowHeight[20]){
			
			clearInterval(d);
			
		}
		else{
			
			i = 0;
		}
	}
	
    i++;
}, 250);