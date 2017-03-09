debugger;
window.onload = function () {
    
      document.getElementById('btnSearch').onclick = function(){ 
          var searchKey = document.getElementById('txtSearch').value;
          var isUrl = document.getElementById("checkURL").checked;

          if (isUrl) {
              var url = 'https://www.facebook.com/search/top/?q=' + searchKey;
              var config = { search: url};
              chrome.tabs.executeScript(null, { code: "var key = " + JSON.stringify(config) },
                function () {
                    chrome.tabs.executeScript(null, { file: "popups/goPosts.js" });
                });
          } else if(searchKey.length !== 0) {
              var url = 'https://facebook.com/search/str/' + searchKey + '/stories-keyword';
              var config = { search: url};
              chrome.tabs.executeScript(null, { code: "var key = " + JSON.stringify(config) },
                function () {
                    chrome.tabs.executeScript(null, { file: "popups/goPosts.js" });
                });
          } else {
              alert("type something in text area");
          }
      };    
      document.getElementById('btnGetPosts').onclick = function () {
          var posts = document.getElementById('howManyPosts').value;
          var config = { postsCount: posts };
          chrome.tabs.executeScript(null,
              { code: "var postsCount = " + JSON.stringify(config) },
              function () {
                
                  chrome.tabs.executeScript(null, { file:"popups/getPosts.js"});
              });

      }; 
}


