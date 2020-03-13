chrome.storage.sync.get('status', function(data){
    if(data.status) {
        function textNodesUnder(el){
            var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
            while(n=walk.nextNode()) a.push(n);
            return a;
        }

        let body = document.getElementsByTagName('body')[0];
        let textNodes = textNodesUnder(body);

        for(let textNode of textNodes){
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirusa", "gi"), "Dobrobytu");
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirusie", "gi"), "Dobrobycie");
            textNode.textContent = textNode.textContent.replace(new RegExp("koronawirus", "gi"), "Dobrobyt");
        }
    }
});


