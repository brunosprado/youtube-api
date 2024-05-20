function filterByDuration(videos, maxValue) {
    let remainingVideos = [...videos];
    return remainingVideos.filter(video => video.duration <= maxValue);
}

module.exports = {
    filterByDuration
}