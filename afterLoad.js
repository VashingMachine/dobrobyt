chrome.storage.sync.get('status', function(data){
    if(data.status) {
        chrome.tabs.executeScript({file: 'filter.js'});
    }
});


