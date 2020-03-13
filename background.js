chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({status: true}, function() {
        console.log("Dict created");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
