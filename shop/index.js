let shop = null;

class Shop {
    constructor(data) {
        this.data = data;
        this.main = $('.main');
    }

    createItem(item) {
        const rarity = item.rarity;
        let colors = {};
        const assets = [];
        let asset = null;

        if(item.assets) {
            const { Background_Color_A: { color: a }, Background_Color_B: { color: b } } = item.assets[0].renderData;
            assets.push(...item.assets);
            asset = item.assets[0].url;
            colors = {
                a,
                b
            };
        }
        else {
            if(rarity) colors = {
                a: rarity.colorA,
                b: rarity.colorB
            };
            asset = '';
        }
        let { size, price: { finalPrice: price }, name, type } = item;
        // TODO: regularPrice (price Object)
        size = size === "Normal" ? null : size === 'DoubleWide' ? '500px' : null;
        const variants = item.assets ? item.assets.length > 1 : false;
        return `<div class="item" style="background: radial-gradient(circle, ${colors.b}, 50%, ${colors.a} 138%);width:${size};"><div><div></div><img src="${asset}" draggable="false"></div><div><div style="background: ${item.series ? colors.b : rarity ? rarity.colorA : null};"></div><div>${name}<div>${type}</div></div><div><img src="./vbucks.png"><div>${Intl.NumberFormat().format(price)}</div></div></div>${item.assets && item.assets[0].renderData.Spotlight_Position_Y ? `<div style="background: radial-gradient(circle at ${item.assets[0].renderData.Spotlight_Position_X}% ${item.assets[0].renderData.Spotlight_Position_Y}%, ${item.assets[0].renderData.FallOff_Color.color} 0%, transparent 100%)"></div>` : ''}</div>`;
    }

    addAllPanels() {
        $('.rows').animate({
            opacity: 0
        }, 1500);
        setTimeout(() => {
            $('.rows').empty();
            const keys = Object.keys(this.data);
            let length = keys.length;
    
            while(length--) {
                const key = keys[length];
                this.setPanel(key, null, length === keys.length - 1 ? true : false);
            }
    
            this.setEvents();

            $('.rows').animate({
                opacity: 1
            }, 500);
        }, 1500);
    }

    setPanel(type, panel, selected=false) {
        let Panel = null;
        if(!$(`#${panel}-${type}`)[0]) {
            Panel = document.createElement('div');
            Panel.id = `${panel}-${type}`;

            document.getElementsByClassName('rows')[0].appendChild(Panel);
            Panel.innerHTML = `<div></div><div><div id="main-message">loading</div></div>`;

            if(selected) {
                if($('.main')[0]) $('.main').remove();
                Panel.classList.add('main');
                $('.main').children().eq(1).animate({
                    left: '36px',
                    opacity: 1
                }, 50);
            }
        }
        const data = (panel ? this.data[type].filter(e => e.categories[0] === panel) : this.data[type]).sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority)).reverse();
        let length = data.length;

        while(length--) {
            const item = data[length];
            const div = document.createElement('div');
            div.id = item.id;
            Panel.children[0].appendChild(div);
            console.log(div);
            if(item.size === "Normal") div.outerHTML = this.createItem(item);
            else {
                const infront = data[length - 1];
                if(!infront || infront.size !== 'Small' || !data[length + 2]) div.outerHTML = this.createItem(item);
                else {
                    div.outerHTML = `<div class="other">${this.createItem(item)}${this.createItem(infront)}</div>`;
                    console.log(div);
                    length--;
                }
            }
            div.onclick = console.log;
        }

        this.data[type].reverse();
        Panel.children[1].children[0].innerHTML = data[0].section.name;
        $('.rows').children().css('position', 'absolute').css('top', '100%');
    }

    setEvents() {
        let index = 0;
        let switching = false;
        const functions = {
            values: {
                up: 730,
                down: 100
            },
            up: (e) => {
                if(switching) return;
                const next = $('.main').prev();
                const element = document.getElementsByClassName('main')[0];
                if(document.getElementsByClassName('main')[1]) document.getElementsByClassName('main')[1].remove();
                if(!next[0]) return console.log('%c[Shop]', 'color: red', `Cannot switch to next section that doesn't exist, at direction up`);
                switching = true;

                console.log('%c[Shop]', 'color: #7289DA', `Switching to next section, at direction up (${next[0].id})`);
                index++;
                up = up + 5;
                $('.main').css('position', 'absolute').animate({
                    top: `100%`,
                    opacity: 0.5
                }, 250);
                next.css('position', 'absolute').animate({
                    top: '0px',
                    opacity: 1
                }, 250);
                next.children().eq(1).css('left', '').css('opacity', '0');
                setTimeout(() => {
                    next[0].style.cssText = '';
                    next[0].classList.add('main');
                    switching = false;
                    next.children().eq(1).animate({
                        left: '36px',
                        opacity: 1
                    }, 50);
                }, 250);
                element.classList.remove('main');
                e.preventDefault();
                return true;
            },
            down: (e) => {
                if(switching) return;
                const next = $('.main').next();
                const element = document.getElementsByClassName('main')[0];
                if(document.getElementsByClassName('main')[1]) document.getElementsByClassName('main')[1].remove();
                if(!next[0]) return console.log('%c[Shop]', 'color: red', `Cannot switch to next section that doesn't exist, at direction down`);
                switching = true;
                console.log('%c[Shop]', 'color: #7289DA', `Switching to next section, at direction down (${next[0].id})`);
                index++;
                down = down + 200;
                $('.main').css('position', 'absolute').animate({
                    top: `-100%`,
                    opacity: 0.5
                }, 250);
                element.classList.remove('main');
                next.animate({
                    top: '0px',
                    opacity: 1
                }, 250);
                next.children().eq(1).css('left', '').css('opacity', '0');
                setTimeout(() => {
                    next[0].style.cssText = '';
                    next[0].classList.add('main');
                    next.children().eq(1).animate({
                        left: '36px',
                        opacity: 1
                    }, 50);
                    switching = false;
                }, 250);
                e.preventDefault();
            }
        }
        let { values: { down, up } } = functions;
        document.onkeydown = function(e) {
            const { key } = e;
            switch(key) {
                case 'ArrowUp': {
                    functions.up(e);
                } break;
        
                case 'ArrowDown': {
                    functions.down(e);
                } break;

                case 'PageUp': {
                    functions.up(e);
                } break;

                case 'PageDown': {
                    functions.down(e);
                } break;
            }
        };

        const delay = 1350;
        let allow = true;

        document.onwheel = (e) => {
            const direction = e.deltaY < 0 ? 'up' : e.deltaY > 0 ? 'down' : null;

            if(allow) {
                functions[direction](e);
                allow = false;
                setTimeout(() => {
                    allow = true;
                }, delay);
            }
        }
    }
    
    setShop() {
        this.addAllPanels();
    }

    setSpecialFeatured(panel=null) {
        return this.setShop('specialFeatured', panel ? `Panel ${panel}` : null);
    }

    setFeatured() {
        return this.setShop('featured');
    }

    setDaily() {
        return this.setShop('daily');
    }
}

$(document).ready(async () => {
    const disable = Cookies.get('acceptance');
    const start = async () => {
        shop = new Shop(await (await fetch(`https://${true ? 'api.blobry.com' : '127.0.0.1:8787'}/data`)).json());
        shop.setShop();
    };
    if(!disable) {
        $('.rows').animate({
            opacity: 0
        }, 1500);
        setTimeout(() => {
            document.body.innerHTML += '<div class="acceptance"><div><div>Acceptance</div><div>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic. Blobry is a non-official Website and is not affiliated with Epic Games in any way.</div><div>You agree by pressing the button below, saying you understand and will every time visiting this website.</div></div><div class="button"><div>accept</div></div></div>';
            $('.acceptance').children()[1].onclick = async () => {
                $('.acceptance').fadeOut(500);
                setTimeout(async () => {
                    Cookies.set('acceptance', true);
                    await start();
                    $('.rows').animate({
                        opacity: 0
                    }, 1500);
                }, 500);
            };
        }, 1500);
    }
    else await start();
});