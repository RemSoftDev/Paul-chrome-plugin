document.getElementById("btnSearchP").addEventListener("click", Result);

function ResultPeople() {        
        var searchKey = document.getElementById('txtSearchP').value;
        var url = 'https://facebook.com/search/str/' + searchKey + '/users-named';  
        window.open(url);     
        };