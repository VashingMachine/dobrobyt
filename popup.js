let testButton = document.getElementById('test');

chrome.storage.sync.get('status', function (data) {
    data.status = data.hasOwnProperty("status") ? data.status : true;
    if (data.status) {
        testButton.classList.add("active");
        testButton.textContent = "Dobrobyt ON"
    } else {
        testButton.classList.remove("active");
        testButton.textContent = "Dobrobyt OFF"
    }
});

testButton.onclick = function () {
    chrome.storage.sync.get('status', function (data) {
        data.status = !data.status;
        chrome.storage.sync.set(data, function () {
            if (data.status) {
                testButton.classList.add("active");
                testButton.textContent = "Dobrobyt ON";
                chrome.tabs.executeScript({file: 'filter.js'});
                chrome.browserAction.setIcon({path: 'images/mora32.PNG'});
            } else {
                chrome.browserAction.setIcon({path: 'images/korona32.PNG'});
                testButton.classList.remove("active");
                testButton.textContent = "Dobrobyt OFF"
            }
        })
    });
};


