const { canWatchVideo, calculateWatchTime, howManyDaysToWatchEntireList } = require("../../src/services/howManyDays")
describe('How many days to watch', () => {
    it('sfdgewniufg', () => {

    });
    describe('canWatchVideo', () => {
        it('Should return True', () => {
            const todayWatchedMinutes = 0; 
            const dailyMaxMinutes = 10;
            const videoLength = 5;
            expect(canWatchVideo(todayWatchedMinutes, dailyMaxMinutes, videoLength)).toBeTruthy()
        });
        it('Should return False', () => {
            const todayWatchedMinutes = 1; 
            const dailyMaxMinutes = 2;
            const videoLength = 15;
            expect(canWatchVideo(todayWatchedMinutes, dailyMaxMinutes, videoLength)).toBeFalsy()
        });
    });
    describe('calculateWatchTime', () => {
        it('Should return the same watched minutes', () => {
            const videos = [{"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31}];
            const weekDaysTimes = {mon: 40, tue: 22};
            let todayWatchedMinutes = 0;
            let weekDay = 'mon';
            let howManyDays = 0;
            const result = calculateWatchTime({videos, todayWatchedMinutes, weekDaysTimes, weekDay, howManyDays})
            expect(result.todayWatchedMinutes).toEqual(videos[0].duration);
            expect(result.howManyDays).toEqual(1);
            expect(result.weekDay).toEqual('mon');
        });
        it('Should return False', () => {
            const videos = [{"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31}];
            let todayWatchedMinutes = 0;
            const weekDaysTimes = {mon: 12, tue: 50};
            const weekDay = 'mon';
            const howManyDays = 0;
            const result = calculateWatchTime({videos, todayWatchedMinutes, weekDaysTimes, weekDay, howManyDays})
            expect(result.todayWatchedMinutes).toEqual(0);
            expect(result.howManyDays).toEqual(1);
            expect(result.weekDay).toEqual('tue');
        });
    });
    describe('howManyDaysToWatchEntireList', () => {
        it('Should return the number of days correct', () => {
            const videos = [{"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31}];
            const weekDaysTimes = {mon: 12, tue: 50};
            const howManyDays = howManyDaysToWatchEntireList(videos, weekDaysTimes)
            expect(howManyDays).toEqual(2);
        });
        it('Should watch all videos in 3 days', () => {
            const videos = [
                {"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31},
                {"videoId":"Sdo7MiarlqM","url":"https://www.youtube.com/embed/Sdo7MiarlqM","title":"Lady Gaga films the joker 2 on the Shakespeare steps in the Bronx in New York City","description":"La","duration":19},
                {"videoId":"QIxV8TCJom0","url":"https://www.youtube.com/embed/QIxV8TCJom0","title":"asmr live- singing lady gaga","description":"🌧My","duration":18}
            ];
            const weekDaysTimes = {mon: 12, tue: 50, wed:20, thu: 10, fri: 15, sat: 20, sun: 12};
            const howManyDays = howManyDaysToWatchEntireList(videos, weekDaysTimes)
            expect(howManyDays).toEqual(3);
        });
        it('Should watch all videos in 4 days', () => {
            const videos = [
                {"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31},
                {"videoId":"Sdo7MiarlqM","url":"https://www.youtube.com/embed/Sdo7MiarlqM","title":"Lady Gaga films the joker 2 on the Shakespeare steps in the Bronx in New York City","description":"La","duration":19},
                {"videoId":"QIxV8TCJom0","url":"https://www.youtube.com/embed/QIxV8TCJom0","title":"asmr live- singing lady gaga","description":"🌧My","duration":18},
                {"videoId":"S2mtWp82KfQ","url":"https://www.youtube.com/embed/S2mtWp82KfQ","title":"singing cover lady gaga","description":"","duration":4}
            ];
            const weekDaysTimes = {mon: 12, tue: 50, wed:20, thu: 10, fri: 15, sat: 20, sun: 12};
            const howManyDays = howManyDaysToWatchEntireList(videos, weekDaysTimes)
            expect(howManyDays).toEqual(4);
        });
        it('Should watch all videos in 9 days', () => {
            const videos = [
                {"videoId":"-3Ck4mNskmI","url":"https://www.youtube.com/embed/-3Ck4mNskmI","title":"COMO CANTAR OS AGUDOS DA LADY GAGA? [Qualquer um consegue usando essa técnica]","description":"Q","duration":31},
                {"videoId":"Sdo7MiarlqM","url":"https://www.youtube.com/embed/Sdo7MiarlqM","title":"Lady Gaga films the joker 2 on the Shakespeare steps in the Bronx in New York City","description":"La","duration":19},
                {"videoId":"QIxV8TCJom0","url":"https://www.youtube.com/embed/QIxV8TCJom0","title":"asmr live- singing lady gaga","description":"🌧My","duration":18},
                {"videoId":"S2mtWp82KfQ","url":"https://www.youtube.com/embed/S2mtWp82KfQ","title":"singing cover lady gaga","description":"","duration":4}
            ];
            const weekDaysTimes = {mon: 20, tue: 5, wed:0, thu: 10, fri: 15, sat: 20, sun: 50};
            const howManyDays = howManyDaysToWatchEntireList(videos, weekDaysTimes)
            expect(howManyDays).toEqual(9);
        });
    })
});