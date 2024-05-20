/* eslint-disable no-undef */
function canWatchVideo(todayWatchedMinutes, dailyMaxMinutes, videoLength) {
    return (todayWatchedMinutes + videoLength) <= dailyMaxMinutes
};

function calculateWatchTime(params) {
    let {videos, todayWatchedMinutes, weekDaysTimes, weekDay, howManyDays} = params
    let remainingVideos = [...videos];
    const dailyMaxMinutes = weekDaysTimes[weekDay]
    const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    
    for (let video of videos) {
        if (canWatchVideo(todayWatchedMinutes, dailyMaxMinutes, video.duration)) {
            todayWatchedMinutes += video.duration;
            remainingVideos = remainingVideos.filter((remainingVideo) => remainingVideo.videoId !== video.videoId);
            if (remainingVideos.length === 0){
                howManyDays += 1
            }
        } else {
            howManyDays += 1
            const currentDayIndex = weekDays.indexOf(weekDay)
            if (currentDayIndex >= 6) {
                weekDay = 'mon';
            } else {
                weekDay = weekDays[(currentDayIndex + 1)];
            }
            todayWatchedMinutes = 0;
            break
        }
    }
    return {
        todayWatchedMinutes, 
        howManyDays, 
        weekDay,
        remainingVideos
    };
};

function howManyDaysToWatchEntireList(videos, weekDaysTimes) {
    let remainingVideos = [...videos];
    let todayWatchedMinutes = 0;
    let howManyDays = 0;
    let weekDay = 'mon';
    while (remainingVideos.length !== 0) {
        const result = calculateWatchTime({videos: remainingVideos, todayWatchedMinutes, weekDaysTimes, weekDay, howManyDays})
        todayWatchedMinutes = result.todayWatchedMinutes;
        howManyDays = result.howManyDays;
        weekDay = result.weekDay;
        remainingVideos = result.remainingVideos;
    };
    return howManyDays;
};

module.exports = {
    canWatchVideo,
    calculateWatchTime,
    howManyDaysToWatchEntireList
}