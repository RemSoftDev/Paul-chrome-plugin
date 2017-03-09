window.onload = function () {
	document.getElementById('scroll-up').onclick = scrollUp;
	document.getElementById('scroll-down').onclick = scrollDown;
	document.getElementById('scroll-bottom').onclick = scrollBottom;
}

function scrollUp() {
	chrome.tabs.executeScript(null, { file: "content-scripts/ScrollUp.js" });
}

function scrollDown() {
	chrome.tabs.executeScript(null, { file: "content-scripts/ScrollDown.js" });
}

function scrollBottom() {
	chrome.tabs.executeScript(null, { file: "content-scripts/ScrollBottom.js" });
}