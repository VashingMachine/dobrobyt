for(let textNode of textNodes){
    for(let key of Object.getOwnPropertyNames(config.dict)){
        textNode.textContent = textNode.textContent.replace(new RegExp(key, "gi"), config.dict[key]);
    }
}