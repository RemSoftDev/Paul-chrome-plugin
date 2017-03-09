

function UpdateCountOnLocalStorage()
{
    var number = localStorage.getItem("count");
    var newNumber = parseInt(number) + 1;
    localStorage.setItem("count", newNumber);
    localStorage.removeItem(number);
}

var art;
function Get3DimensionalArrayOfArticlesAndtextAndContent() {   
    var css = document.styleSheets;
    var js = document.scripts;
    //var namesAndCategories = document.getElementsByClassName('_5bl2 _3u1 _41je _5und');
    var headContent = document.getElementsByTagName('head')[0].innerHTML;
    var scriptsInBody = document.body.getElementsByTagName('script');
    var linksInBody = document.body.getElementsByTagName('link');   
    var articlesAndtextAndContent = document.getElementsByClassName('userContentWrapper _5pcr');
    art = articlesAndtextAndContent;
    
    //CreateNewWindowWithPosts(ArticlesAndtextAndContent, css, js);

    var articles = [].map.call(
        articlesAndtextAndContent,
        function (articles) {
            var art = articles.getElementsByClassName('_5x46')[0];
            if (art != undefined)
            {
                return art;
            }
            return "";
        });

    var text = [].map.call(
        articlesAndtextAndContent,
        function (text) {
            var txt = text.getElementsByClassName('_5pbx userContent')[0];
            if (txt != undefined)
            {
                return txt;
            }
            return "";
        });

    var contentP = [].map.call(
        articlesAndtextAndContent,
        function (contentP) {
            var con = contentP.getElementsByClassName('_3x-2')[0];
            if (con != undefined)
            {
                return con;
            }
            return "";
        });

    var likes = [].map.call(
        articlesAndtextAndContent,
        function (likes) {                 
            var lik = likes.getElementsByClassName('_4arz')[0];;
            if (lik != undefined)
            {
                return lik.innerText;
            }
            return "0";
        });     

    var comments = [].map.call(
        articlesAndtextAndContent,
        function (comments) {                 
            var comm = comments.getElementsByClassName('_36_q')[0];;
            if (comm != undefined)
            {
                return comm.innerText;
            }
            return "0 Comments";
        });
    
    var shares = [].map.call(
        articlesAndtextAndContent,
        function (shares) {                 
            var sh = shares.getElementsByClassName('_ipm')[1];;
            if (sh != undefined)
            {
                return sh.innerText;
            }
            return "0 Shares";
        });
    
    var dates = [].map.call(
        articlesAndtextAndContent,
        function (dates) {
            return dates.getElementsByTagName('abbr')[0].getAttribute('data-utime');
        });

    var videos = [].map.call(
        articlesAndtextAndContent,
        function (videos) {
            return videos.getElementsByTagName('video')[0];
        });

    var youtube = [].map.call(
        articlesAndtextAndContent,
        function (youtube) {
            return youtube.getElementsByClassName('_6kt _6l- __c_')[0];
        });

    var youtubeFullPost = [].map.call(
        articlesAndtextAndContent,
        function (youtubeFullPost) {
            return youtubeFullPost.getElementsByClassName('_6n7')[0];
        });
    
    var likesN;

    if (likes === "0")
    {
        likesN = 0;
    }
    else {
        likesN = ParseLikes(likes);
    }

    var commentsN;
    if (comments === "0 Commetns") {
        commentsN = 0;
    }
    else {
        commentsN = ParseComments(comments);
    }

    var sharesN;

    if (shares === "0 Shares")
    {
        sharesN = 0;
    }
    else
    {
        sharesN = ParseShares(shares);
    }

    debugger;
    var posts = [articles, text, contentP, likes, likesN, shares, sharesN, dates, comments, commentsN, videos, youtube, youtubeFullPost];
    var result =
    {
        posts,
        styles: css,
        scripts: js,
        head: headContent,
        bodyScripts: scriptsInBody,
        bodyLinks: linksInBody
};
    
    return result;
}

function CreateNewWindowWithPosts(collectionOfElements) {    
    //creating body of html
    CreateBodyOfHTML(collectionOfElements);     
}

function PartialViewButtons(sortedPosts, win) {

   

    AddCSSAndScriptsInHead(sortedPosts, win);

    AddButtonsToHTML(win);
    
    //handle buttons
   

    CreateBodyOfHTML(sortedPosts);

    EventHandlers(win);
}

function AddCSSAndScriptsInHead(collectionOfElements, win) {
    
    //load CSS to page
    
    win.document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin = "anonymous" >';
    win.document.getElementsByTagName('head')[0].innerHTML += '<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/css/bootstrap-select.css" rel="stylesheet"/>';

    win.document.getElementsByTagName('head')[0].innerHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js"></script>';
    win.document.getElementsByTagName('head')[0].innerHTML += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>';
    win.document.getElementsByTagName('head')[0].innerHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.js"></script>';
    
    
    win.document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="/css/style.css">';
 
    win.document.getElementsByTagName('head')[0].innerHTML += collectionOfElements.head;
}

function CreateBodyOfHTML(collectionOfElements) {

    if (win.document.getElementById('postsContainer') != undefined) {
        var bodyPts = win.document.getElementById('postsContainer');

        bodyPts.outerHTML = "";
    }
    var contentBegin = '<div id="postsContainer" style = "max-width: 494px; width: 494px; margin:0 auto;">';
    var contentEnd = '</div>';

    var html = contentBegin; 

    for (var i = 0; i < collectionOfElements.posts.length; i++) {
      
        html += '<div class="" style="padding: 15px; background-color:white;  margin-bottom:15px;">';
       
       
        html += collectionOfElements.posts[i].articles.innerHTML; 

        if ( collectionOfElements.posts[i].text != undefined ) 
        {
            html += collectionOfElements.posts[i].text.innerHTML; 
        }

        if ( collectionOfElements.posts[i].content != undefined) 
        {
            html += collectionOfElements.posts[i].content.innerHTML;  
        }

        html += '<hr>';

       if ( collectionOfElements.posts[i].likes != undefined) 
        {
            html += collectionOfElements.posts[i].likes + " Likes   ";  
        }

       if ( collectionOfElements.posts[i].shares != undefined) 
        {
            html += collectionOfElements.posts[i].shares + '   ';  
        }

       if (collectionOfElements.posts[i].comments != undefined) {
           html += collectionOfElements.posts[i].comments + '   ';
       }

       
        html += '</div>';
    }     
    
    html += contentEnd;

    //add scripts to body end
    for (var j = 0; j < collectionOfElements.bodyScripts.length; j++) {
        html += collectionOfElements.bodyScripts[j].outerHTML;
    }

    //add links to body end
    for (var h = 0; h < collectionOfElements.bodyLinks.length; h++) {
        html += collectionOfElements.bodyLinks[h].outerHTML;
    }

    //add facebook attributes to html 
    var att = win.document.getElementsByTagName('html')[0];
    var body = win.document.getElementsByTagName('body')[0];
    //body.setAttribute('style', 'background-color: #e9ebee;');
    body.setAttribute('style', 'padding-top: 90px; background-color: #e9ebee;');
    att.setAttribute('lang', 'en');
    att.setAttribute('id', 'facebook');

    //write all html date to page
    win.document.body.innerHTML += html;   
}

function AddButtonsToHTML(win)
{
    var test = '<ul class="nav"><li><a>Left</a></li><li><a>Left</a></li></ul><ul class="nav nav-center"><li><a>Center 1</a></li><li><a>Center 2</a></li></ul><ul class="nav pull-right"><li><a>Right</a></li></ul>';
    var sortingNavbar = '<div class="navbar navbar-fixed-top" style="background-color: #80ccff; height: 80px;><div class="navbar-inner"><div style="margin:auto;position:absolute;top:15;bottom:0;"><ul class="nav"><li style="display:inline-block; float:left; padding: 17px 30px; color: #000000;font-size:17px;">Sort by</li><li style="display:inline-block; float:left;"><select class="selectpicker navbar-brand" id="sorting"><option selected="selected" id="lk" value="likes">Likes</option><option id="sh" value="shares">Shares</option><option id="dt" value="dates">Dates</option><option id="tt" value="total">Total engagement</option></select></li><li style="display:inline-block; float:left; padding: 17px 30px; font-size:17px;">Filter by</li><li li style="display:inline-block; float:left; "><select id="filtering" class="selectpicker navbar-brand"><option selected="selected" value="all">All</option><option value="videos">Videos</option><option value="texts">Text</option></select></li></ul></div></div></div>';
    var filterNavbar = '<select class="selectpicker navbar-brand nav pull-right""><option>All</option><option>Videos</option><option>Text</option></select>';
    var divBegin = '<div class="navbar navbar-fixed-top" style="background-color: #80ccff; height: 80px;">';
    var buttonsSortBegin = '<h3 class="navbar-brand">Sort by</h3>';
    var likesBtn = '<a href="#" id="btnLikes" type="button" class="navbar-brand"><i class="glyphicon glyphicon-upload"></i>Likes</a>';
    var sharesBtn = '<a href="#" id="btnShares" type="button" class = "navbar-brand"><i class="glyphicon glyphicon-upload"></i>Shares</a>';
    var dateBtn = '<a href="#" id="btnDate" type="button" class = "navbar-brand"><i class="glyphicon glyphicon-upload"></i>Date</a>';
    var totalBtn = '<a href="#" id="btnTotal" type="button"class = "navbar-brand"><i class="glyphicon glyphicon-upload"></i>Total Engagement</a>';
    var divEnd = '</div>';
    //win.document.body.innerHTML += (divBegin + buttonsSortBegin + likesBtn + sharesBtn + dateBtn + totalBtn + divEnd);
    win.document.body.innerHTML += sortingNavbar;
}

function EventHandlers(win) {  
    var sort = win.document.getElementById("sorting");
    sort.onchange = function () {
            SelectSortingAction();
    }

    var filter = win.document.getElementById("filtering");
    filter.onchange = function () {
       
        SelectFilteringAction();
    }
}

function SelectSortingAction() {
   
    var selected = win.document.getElementById('sorting').value;
    if (selected === "likes") {        
        ReloadPageWithSortedLikes();
        win.document.getElementById('sorting').options[0].selected = true;
        win.document.getElementById('filtering').options[filterSelected].selected = true;
    } else if (selected === "shares") {
        ReloadPageWithSortedShares();
        win.document.getElementById('sorting').options[1].selected = true;
        win.document.getElementById('filtering').options[filterSelected].selected = true;
    } else if (selected === "dates") {
        ReloadPageWithSortedDates();
        win.document.getElementById('sorting').options[2].selected = true;
        win.document.getElementById('filtering').options[filterSelected].selected = true;
    } else if (selected === "total") {
        ReloadPageWithSortedTotalEngagement();
        win.document.getElementById('sorting').options[3].selected = true;
        win.document.getElementById('filtering').options[filterSelected].selected = true;
    }             
}

var filterSelected = 0;
function SelectFilteringAction() {
   
    var selected = win.document.getElementById('filtering').value;
    if (selected === "all") {
        All();      
        ReloadPageWithSortedLikes();
        win.document.getElementById('filtering').options[0].selected = true;
        filterSelected = 0;
    } else if (selected === "videos") {
        All();
        FilterByVideos();
        ReloadPageWithSortedLikes();
        win.document.getElementById('filtering').options[1].selected = true;
        filterSelected = 1;
    } else if(selected === 'texts') {
        All();
        FilterByTexts();
        ReloadPageWithSortedLikes();
        win.document.getElementById('filtering').options[2].selected = true;
        filterSelected = 2;
    }
}

function ReloadPageWithSortedLikes() {
    
  
    //sorting posts by likes
    var sortedPosts = SortByLikes(articlesAndtextAndContent, multi);

    //building page with results
    CreateNewWindowWithPosts(sortedPosts);

    EventHandlers(win);
}

function ReloadPageWithSortedTotalEngagement() {
   
    //sorting posts by likes
    var sortedPosts = SortByTotalEngagement(articlesAndtextAndContent, multi);

    //building page with results
    CreateNewWindowWithPosts(sortedPosts, win);

    EventHandlers(win);
}

function ReloadPageWithSortedShares()
{
   
    //sorting posts by likes
    var sortedPosts = SortByShares(articlesAndtextAndContent, multi);
    
    //building page with results
    CreateNewWindowWithPosts(sortedPosts, win);

    EventHandlers(win);
}

function ReloadPageWithSortedDates() {
   
    //sorting posts by likes
    var sortedPosts = SortByDates(articlesAndtextAndContent, multi);

    //building page with results
    CreateNewWindowWithPosts(sortedPosts, win);

    EventHandlers(win);
}


function ParseLikes(likes)
{
    var likesNumbers = [];
    for(var i = 0; i < likes.length; i++) {

        if (/\s/.test(likes[i]))
        {
            var sp = likes[i].split(/(\s+)/);

            if (sp[sp.length - 1] === "others") //check for logic 'split'
            {
                likes[i] = sp[sp.length - 3];
                likesNumbers[i] = parseFloat(likes[i]);
            }
            else
            {
                likesNumbers[i] = parseFloat(likes[i]);
            }
        }

        else
        {
            likesNumbers[i] = parseFloat(likes[i]);
        }
          
        if(likes[i].substring(likes[i].length - 1) === "K")
        {
            likesNumbers[i] = likesNumbers[i] * 1000;
        }

        else if(likes[i].substring(likes[i].length - 1) === "M")
        {
             likesNumbers[i] = likesNumbers[i] * 1000000;
        }       
    }
    return likesNumbers;
}

function ParseShares(likes)
{
    var likesNumbers = [];
    var trimed;
    for(var i = 0; i < likes.length; i++)
    {
        likesNumbers[i] = parseFloat(likes[i]);
        trimed = likes[i].substr(0,likes[i].indexOf(' ')); 
        if(trimed.substring(trimed.length - 1) === "K")
        {
            likesNumbers[i] = likesNumbers[i] * 1000;
        }

        else if(trimed.substring(trimed.length - 1) === "M")
        {
            likesNumbers[i] = likesNumbers[i] * 1000000;
        }

        else if (trimed.length === 0)
        {
            likesNumbers[i] = 0;
        }
    }
    return likesNumbers;
}

function ParseComments(comments) {
    var likesNumbers = [];
    var trimed;
    for (var i = 0; i < comments.length; i++) {
        likesNumbers[i] = parseFloat(comments[i]);
        trimed = comments[i].substr(0, comments[i].indexOf(' '));
        if (trimed.substring(trimed.length - 1) === "K") {
            likesNumbers[i] = likesNumbers[i] * 1000;
        }

        else if (trimed.substring(trimed.length - 1) === "M") {
            likesNumbers[i] = likesNumbers[i] * 1000000;
        }

        else if (trimed.length === 0) {
            likesNumbers[i] = 0;
        }
    }
    
    return likesNumbers;
}

function FilterByVideos() {
    articlesAndtextAndContent.posts = "";
  
    var filteredMulti = [];
    var k = 0;
    for (var i = 0; i < multi.length; i++) {
        if (multi[i].video === true) {
            filteredMulti[k] = multi[i];
            k++;
        }
    }
    multi = filteredMulti;
    k = 0;

    SortByLikes(articlesAndtextAndContent, multi);
}

function FilterByTexts() {
    articlesAndtextAndContent.posts = "";
 
    var filteredMulti = [];
    var k = 0;
    for (var i = 0; i < multi.length; i++) {
        if (multi[i].video === false) {
            filteredMulti[k] = multi[i];
            k++;
        }
    }
    multi = filteredMulti;
    k = 0;

    SortByLikes(articlesAndtextAndContent, multi);
}

function All() {
    multi = allMulti;

    SortByLikes(articlesAndtextAndContent, multi);
}


//var likesSorted = false;
function SortByLikes(arr, multi)
{    
    var sorted = multi.sort(ComparatorLikes);

    //if (!likesSorted) {
    //    likesSorted = true;
    //} else {
    //    likesSorted = false;
    //}

    arr.posts = sorted;
   
    return arr;     
}


function ComparatorLikes(a, b) {
    //if (!likesSorted) {
        return b.likesN - a.likesN;    
    //} 
    //return a.likesN - b.likesN;   
}

//var totalEngagementSorted = false;
function SortByTotalEngagement(arr, multi) {
    var sorted = multi.sort(ComparatorTotalEngagement);

    //if (!totalEngagementSorted) {
    //    totalEngagementSorted = true;
    //} else {
    //    totalEngagementSorted = false;
    //}

    arr.posts = sorted;

    return arr;
}

function ComparatorTotalEngagement(a, b) {
    //if (!totalEngagementSorted) {
        return b.totalEngagement - a.totalEngagement;
    //}
    //return a.totalEngagement - b.totalEngagement;
}

//var sharesSorted = false;
function SortByShares(arr, multi)
{    
    var sorted = multi.sort(ComparatorShares);

    //if (!sharesSorted) {
    //    sharesSorted = true;
    //} else {
    //    sharesSorted = false;
    //}

    arr.posts = sorted;
    
    return arr;     
}

function ComparatorShares(a, b)
{
    //if (!sharesSorted) {
        return b.sharesN - a.sharesN;
    //}
    //return a.sharesN - b.sharesN;
}

//var datesSorted = false;
function SortByDates(arr, multi) {
    var sorted = multi.sort(ComparatorDates);

    //if (!datesSorted) {
    //    datesSorted = true;
    //} else {
    //    datesSorted = false;
    //}

    arr.posts = sorted;

    return arr;
}

function ComparatorDates(a, b) {
    //if (!datesSorted) {
        return b.datesUnixFormat - a.datesUnixFormat;
    //}
    //return a.datesUnixFormat - b.datesUnixFormat;
}

 function GetMultidirArray(posts) {
     
    function getVideo(i) {
        if (posts[10][i] != undefined || posts[11][i] != undefined || posts[12][i] != undefined) {
            return true;
        } else {
            return false;
        }
    }
     var multi = [];
     for(var i = 0; i < posts[0].length; i++)
     {
         multi[i] = {};

         multi[i]["articles"] = posts[0][i];
         multi[i]["text"] = posts[1][i];
         multi[i]["content"] = posts[2][i];
         multi[i]["likes"] = posts[3][i];
         multi[i]["likesN"] = posts[4][i];
         multi[i]["shares"] = posts[5][i];
         multi[i]["sharesN"] = posts[6][i];
         multi[i]["datesUnixFormat"] = posts[7][i];
         multi[i]["comments"] = posts[8][i];
         multi[i]["commentsN"] = posts[9][i];
         multi[i]["totalEngagement"] = posts[4][i] + posts[6][i] + posts[9][i];
         multi[i]["video"] = getVideo(i);
     }
     
     return multi;
 }

var articlesAndtextAndContent;
var multi;
var allMulti;
var win;

function BuildPostsResults() {
    {
        //executing when plugin Get Posts firts clicked 
        //UpdateCountOnLocalStorage();

        //get posts from page
         articlesAndtextAndContent = Get3DimensionalArrayOfArticlesAndtextAndContent();

        //get multi array of posts info for sorting 
         multi = GetMultidirArray(articlesAndtextAndContent.posts);
         allMulti = GetMultidirArray(articlesAndtextAndContent.posts);
        
        //sorting posts by likes
        var sortedPosts = SortByLikes(articlesAndtextAndContent, multi);

        //create new tab
         win = window.open("", "Title", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=no, scrollbars=yes, resizable=yes, width=760, height=600, top=" + (screen.height - 400) + ", left=" + (screen.width - 840));
       
        //building page with results
        PartialViewButtons(sortedPosts, win);

      
    }
}

var postsCount = parseInt(postsCount.postsCount);

function GetPostsCount() {
    var posts = document.getElementsByClassName('userContentWrapper _5pcr');
    return posts.length;
}

function ScrollDown() {  
    window.scrollBy(0, Number.MAX_SAFE_INTEGER);
}

var count;
function Start() {
    
    count = GetPostsCount();
    if (count >= postsCount) {

        BuildPostsResults();

    } else {

        ScrollDown();
        window.setTimeout(function () { Start(); }, 1000);       
    }
}

Start();
 


