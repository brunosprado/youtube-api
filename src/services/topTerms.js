function countTermsFrequency(lists) {
    const disregardedTerms = [
        '4k', '4K', 'HD', 'hd', '[hd]', 'video', 'official', 'da', 'do',
        'de', 'no', 'na', 'a', 'as', 'e', 'o', 'os', 'por', 'para', 'em',
        'dos', 'das', 'https', 'com', 'a', 'www', 'the', 'to', 'and', 's'
    ];

    const allText = lists.map(list => `${list.title} ${list.description}`).join(' ').toLowerCase();
    const words = allText.match(/\b\w+\b/g) || [];

    const filteredWords = words.filter(word => !disregardedTerms.includes(word));
    const frequency = filteredWords.reduce((count, word) => {
        count[word] = (count[word] || 0) + 1;
        return count;
    }, {});

    const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 5).map(([word]) => word);
}

module.exports = {
    countTermsFrequency
}