require('dotenv').config({ path: './.env' })
const express = require("express");
const app = express();
const port = 3000;
const {makeSearchRequest} = require("./src/services/getVideosId")
const {makeVideosRequest} = require("./src/services/getVideoData")
const { howManyDaysToWatchEntireList } = require("./src/services/howManyDays")


app.get("/", (res) => {
    res.send("Tela de início")
});


app.get("/search", async (req, res, next) => {
    try {
        // to do: 
        // validar tempo maximo dos dias informados via parametro, para garantir que não seja maior que 1 dia
        const searchQuery = req.query.search_query;
        validateQuery(req.query);
        const weekday = getCurrentWeekday();
        const videosId = [];
        const videosData = [];
        await makeSearchRequest(videosId, searchQuery);
        await makeVideosRequest(videosData, videosId);
        // Filtrar a lista de videos a partir do dia com maior tempo disponivel
        //  - Caso não hajam videos disponiveis na lista, o usuario deve ser informado
        const topTerms = countTermsFrequency(videosData);
        const howManyDays = howManyDaysToWatchEntireList(videosData, req.query)
        res.send({howManyDays, topTerms, videosData});
    } catch (err) {
        next(err)
    }
});

function validateQuery(query) {
    const requiredParams = ['search_query', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const urlParams = new URLSearchParams(query);
    for (let param of requiredParams) {
        if (!urlParams.has(param)) {
            throw new Error(`Faltando parâmetro obrigatório: ${param}`);
        }
    }

    return true;
}

function countTermsFrequency(lists) {
    const disregardedTerms = [
        '4k', '4K', 'HD', 'hd', '[hd]', 'video', 'official', 'da', 'do',
        'de', 'no', 'na', 'a', 'as', 'e', 'o', 'os', 'por', 'para', 'em',
        'dos', 'das', 'https', 'com', 'a', 'www', 'the', 'to', 'and', 's'];

    const allText = lists.map(list => `${list.title} ${list.description}`).join(' ').toLowerCase();
    const words = allText.match(/\b\w+\b/g).filter(word => !disregardedTerms.includes(word));
    const frequency = words.reduce((count, word) => {
        count[word] = (count[word] || 0) + 1;
        return count;
      }, {});
    const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 5).map(([word]) => word);   
    }

function getCurrentWeekday() {
  const now = new Date();
  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const weekday = weekDays[now.getDay()];
  return weekday;
}

app.listen(port, () => {
    console.log("Aplicativo Rodando!")
});