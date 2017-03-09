//var TargetFunc = func();
window.setInterval(func, 300000);
function func() {
    //alert("Storage rewrite called")
    var lastElement = localStorage.getItem("lastElement");
    try{
        var lastElement = localStorage.getItem("lastElement");
        for (var i = 0; i < lastElement; i++) {
            var temp = localStorage.getItem(i);
            localStorage.removeItem(i);
            localStorage.setItem(i, temp);
        }
        //alert("storage rewrited");
    }
    catch (exception) {
        //alert("storage not rewrited");
    }
}