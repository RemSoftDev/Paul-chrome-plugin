document.getElementById("btnSearch").addEventListener("click", Result);
document.getElementById("btnSearchP").addEventListener("click",ResultPeople);

function ResultPeople() {        
        var searchKey = document.getElementById('txtSearchP').value;
        var url = 'https://facebook.com/search/str/' + searchKey + '/users-named';  
        window.open(url);     
        };
function Result() {        
        var searchKey = document.getElementById('txtSearch').value;
        var url = 'https://facebook.com/search/str/' + searchKey + '/stories-keyword';  
        window.open(url);     
        };