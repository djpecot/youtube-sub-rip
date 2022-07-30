import { getCurrentTab } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
    const bookmarkTitleElement = document.createElement('div');
    const newBookmarkElement = document.createElement('div');

    bookmarkTitleElement.textContent = bookmark.desc + bookmark.time;
    bookmarkTitleElement.className = 'bookmark-title';

    // Set a  unique key for each time
    newBookmarkElement.id = 'bookmark-' + bookmark.time;
    newBookmarkElement.className = 'bookmark';
    newBookmarkElement.setAttribute('timestamp', bookmark.time);
    // newBookmarkElement.textContent = bookmark.time;

    newBookmarkElement.appendChild(bookmarkTitleElement);
    bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
    // from HTML in window
    const bookmarksElement = document.getElementById('bookmarks');
    bookmarksElement.innerHTML = '';

    if (currentBookmarks.length > 0) {
        for (let i = 0; i < currentBookmarks.length; i++) {
            const bookmark = currentBookmarks[i];
            console.log('Iterating through bookmarks', bookmark);
            addNewBookmark(bookmarksElement, bookmark);
        }
    } else {
        bookmarksElement.innerHTML = '<i class="row">no bookmarks to show</i>';
    }
};

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

            viewBookmarks(currentVideoBookmarks);
            console.log('All current bookmarks ->', currentVideoBookmarks);
        });
    } else {
        const container = document.getElementsByClassName('container')[0];

        container.innerHTML =
            '<div class="title">This is not a youtube page.</div>';
    }
});
