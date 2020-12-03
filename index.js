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
                $('.center')[0].innerHTML = `<div id="shoper" style=" color: wheat; width: 500px; height: 400px; top: -192px; background: #6175B7; border-radius: 5px; filter: none; line-height: 28; text-align: center; color: #6175B7; user-select: none; cursor: pointer;"><div style=" background: black; width: 108%; height: 9px; position: absolute; top: 403px; background: #6175B7; border-radius: 5px; left: -20px;"></div><div style=" height: 11px;">Shop</div></div>`;
                $('#shoper').click(() => {
                    new Page({
                        content: '<div id="shop" style=" width: 100%; height: 100vh; position: absolute; transform: translate(-50%, -50%); top: 73%; left: 51%; z-index: 2; overflow: hidden;"><div style=" width: 100%; position: relative; overflow: hidden; top: unset; display: flex; width: 100%; position: relative; overflow: hidden; z-index: 100; top: unset;"><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 262px;height: 410px;margin: 5px;animation-duration: 56.2s;animation-iteration-count: infinite;animation-name: loading;flex-shrink: 0;"></div><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 262px;height: 410px;margin: 5px;animation-duration: 56.2s;animation-iteration-count: infinite;animation-name: loading;flex-shrink: 0;"></div><div style="width: 262px;height: 410px;margin: 5px;position: relative;top: -6px;left: -7px;flex-shrink: 0;"><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 100%;height: 202px;animation-duration: 56.2s;animation-iteration-count: infinite;animation-name: loading;margin: 6px;"></div><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 100%;height: 202px;margin: 6px;animation-duration: 56.2s;animation-iteration-count: infinite;animation-name: loading;"></div></div><div style="width: 262px;height: 410px;margin: 5px;position: relative;top: -6px;left: -7px;flex-shrink: 0;"><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 100%;height: 202px;margin: 6px;animation-duration: 48.2s;animation-iteration-count: infinite;animation-name: loading;flex-shrink: 0;"></div><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 100%;height: 202px;margin: 6px;animation-duration: 45.2s;animation-iteration-count: infinite;animation-name: loading;flex-shrink: 0;"></div></div><div style="background: linear-gradient(to right, #7289E7 8%, #6175B7);width: 262px;height: 410px;margin: 5px;animation-duration: 56.2s;animation-iteration-count: infinite;animation-name: loading;flex-shrink: 0;"></div></div></div>',
                        id: 'shop',
                        url: 'https://data.blobry.com/athena/outlet?transition=true'
                    }).transition();
                });
                const settings = {"target":"test","max":"200","size":"0.6","animate":true,"props":["square"],"colors":[[97,117,183]],"clock":"25","rotate":true,"width":"1366","height":"657","start_from_edge":false,"respawn":true};
                const confetti = new ConfettiGenerator(settings);
                confetti.render();
            }, 250);
        }
    }
});