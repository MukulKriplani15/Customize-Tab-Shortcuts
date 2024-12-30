function duplicateTab(tab) {
  chrome.tabs.duplicate(tab.id);
}

function moveToNextTab() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const currentTabIndex = tabs.findIndex((tab) => tab.active);
    const nextTabIndex = (currentTabIndex + 1) % tabs.length;
    chrome.tabs.update(tabs[nextTabIndex].id, { active: true });
  });
}

function moveToPrevTab() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const currentTabIndex = tabs.findIndex((tab) => tab.active);
    const prevTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
    chrome.tabs.update(tabs[prevTabIndex].id, { active: true });
  });
}

function minimizeWindow() {
  chrome.windows.getCurrent(function (window) {
    chrome.windows.update(window.id, { state: "minimized" });
  });
}

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentTab = tabs[0];
    switch (command) {
      case "duplicate-tab":
        duplicateTab(currentTab);
        break;
      case "move-next-tab":
        moveToNextTab();
        break;
      case "move-prev-tab":
        moveToPrevTab();
        break;
      case "minimize-window":
        minimizeWindow();
        break;
    }
  });
});
