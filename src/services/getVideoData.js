const youtube = require("./youtube")

const getVideoData = (item) => {
    return {
        videoId: item.id,
        url: `https://www.youtube.com/embed/${item.id}`,
        title: item.snippet.title,
        description: item.snippet.description,
        duration: parseDuration(item.contentDetails.duration)
    }
}

const makeVideosRequest = async (videosData, videosId, lastResponse = null) => {
    const videosRequestData = getVideosRequestData(videosData, videosId, lastResponse)
    const response = await youtube.videos.list(videosRequestData)
    response.data.items.forEach(
        item => videosData.push(getVideoData(item))
    )
    videosData.length < 200 && await makeVideosRequest(videosData, videosId, response)
}

const getNextFiftyVideosId = (videosId, videosData) => {
    const initialIndex = videosData.length
    return videosId.slice(initialIndex, initialIndex + 50).join()
}

const getVideosRequestData = (videosData, videosId) => {
    const nextFiftyVideosId = getNextFiftyVideosId(videosId, videosData)
    const videosRequestData = {
        part: ['snippet, contentDetails'],
        id: [nextFiftyVideosId],
        maxResults: 50
    }
    return videosRequestData
}


function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    const durationFormated = Math.round((hours * 3600 + minutes * 60 + seconds) / 60)
    return durationFormated;
}

module.exports = {
    makeVideosRequest
}