chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({status: true}, function() {});

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request?.status) {
        chrome.browserAction.setIcon({path: 'images/mora32.PNG'});
    }
});
