const version = document.getElementById("version");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

const func = async () => {
    const v = await window.electronAPI.appVersion();
    version.innerText = v;
};
func();

//check for updates
window.electronAPI.onUpdateAvailable((e) => {
    message.innerText = "A new update is available. Downloading now...";
    notification.classList.remove("hidden");
});

//check if update is downloaded and ready to install 
window.electronAPI.onUpdateDownloaded((e) => {
    message.innerText =
    "Update Downloaded. It will be installed on restart. Restart now?";
    restartButton.classList.remove("hidden");
    notification.classList.remove("hidden");
});

function closeNotification() {
    notification.classList.add("hidden");
}
function restartApp() {
    window.electronAPI.restart;
}