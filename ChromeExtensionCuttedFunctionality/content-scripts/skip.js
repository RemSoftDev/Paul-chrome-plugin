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

window.open(href);
localStorage.removeItem(number);

window.close();