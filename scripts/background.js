/** @format */

const getStorage = async () => {
  storage = await chrome.storage.sync.get([
    "slackBotToken",
    "channelToPost",
    "messagePrefix",
  ]);
  const slackBotToken = storage.slackBotToken ?? "";
  const channel = storage.channelToPost ?? "";
  const messagePrefix = storage.messagePrefix ?? "";
  return { slackBotToken, channel, messagePrefix };
};

const createRequestOptions = (slackBotToken, channel, message) => {
  const headers = createHeaders(slackBotToken);
  const body = createBody(message, channel);

  return {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };
};

const createHeaders = (slackBotToken) => {
  const myHeaders = new Headers();
  const authorization = `Bearer ${slackBotToken}`;
  myHeaders.append("Authorization", authorization);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  return myHeaders;
};

const createBody = (message, channel) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("text", message);
  urlencoded.append("channel", channel);

  return urlencoded;
};

const postMessage = (slackBotToken, channel, message) => {
  const requestOptions = createRequestOptions(slackBotToken, channel, message);

  fetch("https://slack.com/api/chat.postMessage", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

chrome.action.onClicked.addListener(async (tab) => {
  const { slackBotToken, channel, messagePrefix } = await getStorage();

  const dataToCopy = `${tab.title}\n${tab.url}`;
  const message = `${messagePrefix}\n${dataToCopy}`;

  postMessage(slackBotToken, channel, message);
});

console.log("background script is loaded!");
