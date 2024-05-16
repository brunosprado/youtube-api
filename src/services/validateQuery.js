function validateQuery(query) {
    const requiredParams = ['search_query', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const urlParams = new URLSearchParams(query);
    for (let param of requiredParams) {
        if (!urlParams.has(param)) {
            throw new Error(`Faltando parâmetro obrigatório: ${param}`);
        }
    }

    return true;
};

function getMaxAttribute(weekDaysTimes) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let maxValue = 0;
    for (let day of days) {
        if (weekDaysTimes[day] > 3600) {
            maxValue = weekDaysTimes[day];
        }
        if (weekDaysTimes[day] > maxValue) {
            maxValue = weekDaysTimes[day];
        }
    }
    return maxValue;
}

module.exports = {
    validateQuery,
    getMaxAttribute
}