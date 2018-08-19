let addButtons = document.getElementsByClassName('add');
let keyInput = document.getElementById('key');
let valueInput = document.getElementById('value');
let dictElement = document.getElementById('dict');

let displayDict = function(dict){

    while(dictElement.firstChild) {
        dictElement.removeChild(dictElement.firstChild);
    }

    for(let entry of Object.getOwnPropertyNames(dict)){
        let key = entry;
        let value = dict[entry];
        let str = key + ' --> ' + value;

        let entryDiv = document.createElement('div');
        let entryElement = document.createElement('span');
        let entryText = document.createTextNode(str);

        let entryDeleteButton = document.createElement('button');
        entryDeleteButton.classList.add('remove');
        entryDeleteButton.value = key;
        entryDeleteButton.appendChild(document.createTextNode('-'));
        entryDeleteButton.onclick = function(el) {
            let key = this.value;
            chrome.storage.sync.get('dictionary', function(data){
                delete data['dictionary'][key];

                chrome.storage.sync.set(data, function(){
                    chrome.storage.sync.get('dictionary', function(data2){
                        displayDict(data.dictionary);
                    });
                });
            });
        }

        entryElement.appendChild(entryText);
        entryDiv.appendChild(entryElement);
        entryDiv.appendChild(entryDeleteButton);
        dictElement.appendChild(entryDiv);
    }
}

for(let button of addButtons){
    button.onclick = function(e){
        key = keyInput.value;
        value = valueInput.value;
        if(key.length > 0){
            chrome.storage.sync.get('dictionary', function(data){
                data['dictionary'][key] = value;

                chrome.storage.sync.set(data, function(){
                    chrome.storage.sync.get('dictionary', function(data2){
                        displayDict(data.dictionary);
                    });
                });
            });
        }
    }
}

chrome.storage.sync.get('dictionary', function(data2){
    displayDict(data2.dictionary);
});

let testButton = document.getElementById('test');
testButton.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.sync.get('dictionary', function(data){
            let dict = data.dictionary;
            let config = {dict: dict};
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'var config = ' + JSON.stringify(config)
            }, function() {
                chrome.tabs.executeScript(tabs[0].id, {file: 'filter.js'});
            });
        });
    });
};