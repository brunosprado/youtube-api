const youtube = require("./youtube")

const getSearchRequestData = (query, lastResponse) => {
    const searchRequestData = {
        part: 'snippet',
        eventType: 'completed',
        maxResults: 50,
        q: query,
        regionCode: 'BR',
        type: 'video'
    }
    if (lastResponse) {
        searchRequestData['pageToken'] = lastResponse.nextPageToken;
    }
    return searchRequestData;
}

const makeSearchRequest = async (videosId, query, lastResponse = null) => {
    const searchRequestData = getSearchRequestData(query, lastResponse);
    const currentResponse = await youtube.search.list(searchRequestData);
    currentResponse.data.items.forEach((item) => {
         videosId.push(item.id.videoId); 
    })
    if (videosId.length < 200) {
        await makeSearchRequest(videosId, query, currentResponse);
    } 
}
module.exports = {
    makeSearchRequest
}