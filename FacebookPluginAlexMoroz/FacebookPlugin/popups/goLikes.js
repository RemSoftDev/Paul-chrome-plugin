debugger;
if(document.location.href.indexOf("?") > -1){
	document.location.href = document.location.href + "&sk=likes";
}
else{
	document.location.href = document.location.href + "?sk=likes";
}	