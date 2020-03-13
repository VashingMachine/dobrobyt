chrome.storage.sync.get('status', function(data){
    if(data.status) {
        function textNodesUnder(el){
            var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
            while(n=walk.nextNode()) a.push(n);
            return a;
        }

        for(let textNode of textNodesUnder(document.getElementsByTagName('body')[0])){
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirusa", "gi"), "Dobrobytu");
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirusie", "gi"), "Dobrobycie");
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirus", "gi"), "Dobrobyt");
            textNode.textContent = textNode.textContent.replace(new RegExp("COVID-19", "gi"), "BÓL-DUPY");
        }

        chrome.runtime.sendMessage({status: true}, function (response) {});
    }
});

