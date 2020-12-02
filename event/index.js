$(document).ready(() => {
    const date = new Date("Dec 2, 2020 01:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const left = date - now;
        const hours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((left % (1000 * 60)) / 1000);

        $('#date')[0].innerHTML = `0${hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
    }, 1000);
});