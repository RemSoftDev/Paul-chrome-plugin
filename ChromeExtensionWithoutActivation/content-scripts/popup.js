function UpdateCountOnLocalStorage()
{
    var number = localStorage.getItem("count");
    var newNumber = parseInt(number) + 1;
    localStorage.setItem("count", newNumber);
    localStorage.removeItem(number);
}

function IsAtLikesHref(href) {
    return href.indexOf("?sk=likes") > -1 ||
           href.indexOf("&sk=likes") > -1 ||
           href.indexOf("/likes") > -1;
}

function LetUserMakeSearchRequest() {
    return prompt("Search in likes", "").split(",");
}

function LetUserDefineOutputFormat() {
    var shouldUseCSV = confirm('Would you like to format output in CSV way?' + '\r\n' + '(\'No\' means data will be formatted as a column).');
    if (shouldUseCSV == true) {
        return ', ';
    } else {
        return '\r\n';
    }
}

function Get2DimensionalArrayOfNamesAndCategories() {
    var namesAndCategories = document.getElementsByClassName('_42ef');
    var names = [].map.call(
        namesAndCategories,
        function (nameAndCategory) {
            return nameAndCategory.getElementsByClassName('fsl fwb fcb')[0].textContent;
        });
    var categories = [].map.call(
        namesAndCategories,
        function (nameAndCategory) {
            return nameAndCategory.getElementsByClassName('fsm fwn fcg')[0].textContent;
        });
    return [names, categories];
}

function Filter(namesAndCategories2DArray, searchRequest) {
    var namesArray = namesAndCategories2DArray[0];
    var categoriesArray = namesAndCategories2DArray[1];
    if (namesArray.lenght != categoriesArray.lenght){
        alert('Error!');
    }

    var filtered = [];
    namesArray.forEach(
        function (name) {
            for (var i = 0; i < searchRequest.length; i++) {
                var currentIndex = namesArray.indexOf(name);
                var category = categoriesArray[currentIndex];
                //console.log(name + ':' + category);
                if (IsMatchesFilter(searchRequest[i], name)) {
                    filtered.push([name, category]);
                }
            }
        });
    return filtered;
}

function IsMatchesFilter(filterFromSerarchRequest, elementText) {
    return (String(filterFromSerarchRequest).toLowerCase().substring(String(elementText).toLowerCase()) > -1);
}

function SortByCategory(namesAndCategories2DArray) // [ [name, category] ] 
{
    function isInUniqueCategoriesArray(element, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] === element) {
                return [true, i];
            }
        }
        return [false, i];
    }

    var sorted = [];
    namesAndCategories2DArray.forEach(
        function (nameAndCategory) {
            var name = nameAndCategory[0];
            var category = nameAndCategory[1];    
            var inArrayResult = isInUniqueCategoriesArray(category, sorted);
            if (!inArrayResult[0]) {
                sorted.push([category, [name]]);
            } else {
                sorted[inArrayResult[1]][1].push(name);
            }
        });
    //console.log(sorted);
    return sorted;
}

function FormatText(sortedByCategoriesList, delimiter)
{
    function FormatCategory(category, names) {
        var formattedCategory = '[ ' + category + ' ]\r\n';
        names.forEach(
            function(name) {
                formattedCategory = formattedCategory + name + delimiter;
            });
        var lastDelimiterIndex = formattedCategory.lastIndexOf(delimiter);
        formattedCategory = formattedCategory.substring(0, lastDelimiterIndex);
        return formattedCategory + '\r\n\r\n';
    }

    var formattedCategories = "";
    sortedByCategoriesList.forEach(
        function (categoryAndNames) {
            formattedCategories = formattedCategories + FormatCategory(categoryAndNames[0], categoryAndNames[1]);
        })
    return formattedCategories;
}

function DownloadTxtFile(filename, text) {
    var encodedData = encodeURIComponent(text);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedData);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


// logic down below uses functions from the beyond
{
    UpdateCountOnLocalStorage();
    if (IsAtLikesHref(document.location.href)) {
        var searchRequest = LetUserMakeSearchRequest();
        var delimiter = LetUserDefineOutputFormat();
        var namesAndCategories2DArray = Get2DimensionalArrayOfNamesAndCategories();
        var filtered = Filter(namesAndCategories2DArray, searchRequest);
        if (filtered.length > 0) {
            var sortedByCategory = SortByCategory(filtered); // [ category, [names] ]
            var formattedText = FormatText(sortedByCategory, delimiter);
            //console.log(formattedText);
            DownloadTxtFile(new Date() + '.txt', formattedText);
        } else {
            alert("No likes found...");
        }
    } else {
        alert("Go to likes first");
    }
}

