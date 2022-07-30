// import {getTime} from './utils'

const getTime = (t) => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
};

(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = '';
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === 'NEW') {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const newVideoLoaded = async () => {
        const bookmarkBtnExists =
            document.getElementsByClassName('bookmark-btn')[0];
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement('img');

            bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
            bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
            bookmarkBtn.title = 'Click to bookmark current timestamp';

            youtubeLeftControls =
                document.getElementsByClassName('ytp-left-controls')[0];
            youtubePlayer = document.getElementsByClassName('video-stream')[0];

            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
        }
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: 'Bookmark at ' + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();
        // console.log('You added a new bookmark!', newBookmark);
        // console.log('What is the current Video?', currentVideo);
        // Doug: Note chrome storage needs to store as JSON @paige
        // We can think about how to store subtitles once extracted, locally for user or?
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(
                [...currentVideoBookmarks, newBookmark].sort(
                    (a, b) => b.time - a.time
                )
            ),
        });
        // // Check storage state
        // chrome.storage.local.get([currentVideo], (result) => {
        //     console.log('Value currently is ' + JSON.stringify(result));
        // });
    };
    newVideoLoaded();
})();
