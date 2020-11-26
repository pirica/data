class Data {
    constructor() {
        
    }
}

$(document).ready(() => {
    let crackE = 'blob.png';
    $('.center').children()[0].onclick = () => {
        if(crackE === 'datacrack2.png') {
            return;
        }
        crackE = crackE === 'blob.png' ? 'data.png' : crackE === 'data.png' ? 'datacrack1.png' : crackE === 'datacrack1.png' ? 'datacrack2.png' : 'blob.png';
        $('.center').children()[0].src = crackE;
        $('.center').children().eq(0).css('transform', `scale(${crackE === 'blob.png' ? '1.7' : crackE === 'data.png' ? '2.5' : crackE === 'datacrack2.png' ? '50' : '3.5'})`);
        if(crackE === 'datacrack2.png') {
            $('.center').children().eq(0).css('filter', 'none');
            setTimeout(() => {
                $('html').css('background', '#7289DA');
                $('.center')[0].innerHTML = `<div style="color: #6175B7;display: flex;font-size: 20px;filter: none;">Hey, we just released this site, <div style="margin-left: 5px;margin-right: 5px;background: #6175B7 !IMPORTANT;width: 98px;text-align: center;border-radius: 5px;color: #7289DA !important;filter: none !important; cursor: pointer;" onclick="window.location = 'https://discord.gg/TS8YSVa'">click here</div> to the discord server to suggest what to put here!</div>`
                const settings = {"target":"test","max":"200","size":"0.6","animate":true,"props":["square"],"colors":[[97,117,183]],"clock":"25","rotate":true,"width":"1366","height":"657","start_from_edge":false,"respawn":true};
                const confetti = new ConfettiGenerator(settings);
                confetti.render();
            }, 250);
        }
    }
});