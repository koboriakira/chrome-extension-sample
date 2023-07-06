/** @format */

document.getElementById("save").addEventListener("click", function () {
  console.log("Save button clicked");
  let userText = document.getElementById("slackBotToken").value;
  chrome.storage.sync.set({ slackBotToken: userText }, function () {
    console.log("Value is set to " + userText);
  });
});

// オプションページが読み込まれたときに、保存された設定を反映させる
window.onload = function () {
  chrome.storage.sync.get(["slackBotToken"], function (result) {
    document.getElementById("slackBotToken").value = result.slackBotToken;
  });
};
