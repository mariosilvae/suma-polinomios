// storage.js
(function (global) {
    const KEY = 'poly_hist_v1'
    function pushHistory(item) {
        const arr = JSON.parse(localStorage.getItem(KEY) || '[]')
        arr.unshift(item)
        localStorage.setItem(KEY, JSON.stringify(arr.slice(0, 30)))
    }
    function loadHistory() {
        return JSON.parse(localStorage.getItem(KEY) || '[]')
    }
    function clearHistory() {
        localStorage.removeItem(KEY)
    }
    global.PolyStorage = { pushHistory, loadHistory, clearHistory }
})(window);
