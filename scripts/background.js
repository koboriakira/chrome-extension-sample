/** @format */

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer <SLACK_BOT_TOKEN>`);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

chrome.action.onClicked.addListener(async (tab) => {
  console.log("This is a background script!");
  var urlencoded = new URLSearchParams();
  urlencoded.append("text", "Hello!");
  urlencoded.append("channel", "openai");

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

  const dataToCopy = `${tab.title}\n${tab.url}`;
  navigator.clipboard.writeText(dataToCopy).then(
    function () {
      console.log("Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
});
