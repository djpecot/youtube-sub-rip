import { getCurrentTab } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = () => {};

document.addEventListener('DOMContentLoaded', async () => {
    const activeTab = await getCurrentTab();
    console.log('Here is your active tab:', activeTab);
    const queryParameters = activeTab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get('v');

    if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo]
                ? JSON.parse(data[currentVideo])
                : [];
        });

        // viewBookmarks
    } else {
        const container = document.getElementsByClassName('container')[0];

        container.innerHTML =
            '<div class="title">This is not a youtube page.</div>';
    }
});
