export const getTime = (t) => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
};

export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
