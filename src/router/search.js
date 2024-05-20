const express = require("express");
const router = express.Router();
const { validateQuery, getMaxAttribute } = require("../services/validateQuery");
const { makeSearchRequest } = require("../services/getVideosId");
const { makeVideosRequest } = require("../services/getVideoData");
const { howManyDaysToWatchEntireList } = require("../services/howManyDays");
const { countTermsFrequency } = require("../services/topTerms");
const { filterByDuration } = require("../services/filterVideos")

router.get("/", async (req, res, next) => {
    try {
        const maxValue = getMaxAttribute(req.query)
        if (maxValue > 3600) {
            res.status(400).send('Sorry, you cant send a day time bigger than 3600 minutes.');
        } else {
            const searchQuery = req.query.search_query;
            validateQuery(req.query);
            const videosId = [];
            let videosData = [];
            await makeSearchRequest(videosId, searchQuery);
            await makeVideosRequest(videosData, videosId);
            videosData = filterByDuration(videosData, maxValue)
            if (videosData != 0) {
                const topTerms = countTermsFrequency(videosData);
                const howManyDays = howManyDaysToWatchEntireList(videosData, req.query)
                res.send({howManyDays, topTerms});
            } else {
                res.send({response: "There's no videos to show due the filter in youtube response"});
            };
        };

    } catch (err) {
        next(err)
    };
});

module.exports = router