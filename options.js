/** @format */

document.getElementById("save").addEventListener("click", function () {
  const slackBotToken = document.getElementById("slackBotToken").value;
  chrome.storage.sync.set({ slackBotToken: slackBotToken }, function () {
    console.log("Value is set to " + slackBotToken);
  });
  const channelToPost = document.getElementById("channelToPost").value;
  chrome.storage.sync.set({ channelToPost: channelToPost }, function () {
    console.log("Value is set to " + channelToPost);
  });
  const messagePrefix = document.getElementById("messagePrefix").value;
  chrome.storage.sync.set({ messagePrefix: messagePrefix }, function () {
    console.log("Value is set to " + messagePrefix);
  });
});

// オプションページが読み込まれたときに、保存された設定を反映させる
window.onload = function () {
  chrome.storage.sync.get(
    ["slackBotToken", "channelToPost", "messagePrefix"],
    function (result) {
      document.getElementById("slackBotToken").value = result.slackBotToken;
      document.getElementById("channelToPost").value = result.channelToPost;
      document.getElementById("messagePrefix").value = result.messagePrefix;
    }
  );
};
