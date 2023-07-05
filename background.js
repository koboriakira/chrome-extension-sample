chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: modifyDOM
    });
});

function modifyDOM() {
    document.body.style.backgroundColor = 'red';
    return document.body.innerHTML;
}
