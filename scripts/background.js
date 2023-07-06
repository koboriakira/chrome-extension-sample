/** @format */

var authorization;
chrome.storage.sync.get(["slackBotToken"], function (result) {
  authorization = `Bearer ${result.slackBotToken}`;
});

chrome.action.onClicked.addListener(async (tab) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", authorization);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const dataToCopy = `${tab.title}\n${tab.url}`;
  var urlencoded = new URLSearchParams();
  urlencoded.append("text", `気になる:\n${dataToCopy}`);
  urlencoded.append("channel", "general");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://slack.com/api/chat.postMessage", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});

console.log("background script is loaded!");
