function showPageAction(tabId, changeInfo, tab) {
    if (tab.url.indexOf("merlin.noctrl.edu") > -1) {
        chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(showPageAction);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                sendResponse(xhr.responseText);
            }
        };
        xhr.open("GET", request.url, true);
        xhr.send();
        return true;
    });
