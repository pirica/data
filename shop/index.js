let shop = null;

class Banner {
    constructor(banner) {
        const hidden = ['reactive', 'variants', 'styles', 'traversal'];
        this.id = banner.id;
        this.name = banner.name;
        this.valid = hidden.find(b => this.name.toLowerCase().includes(b)) || ['collect the set'].find(e => this.name.toLowerCase().includes(e.toLowerCase())) ? false : true;
        this.special = this.valid && !['collect the set'].find(e => this.name.toLowerCase().includes(e.toLowerCase())) ? false : true;
    }
}

class Sections {
    constructor(sections) {
        this.raw = sections;
        this.sections = sections;
        this.set();
    }

    set() {
        const keys = Object.keys(this.sections);
        let length = keys.length;

        while(length--) {
            const key = keys[length];
            const section = this.sections[key].sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority)).reverse();
            let lengther = section.length;

            while (lengther--) {
                const item = section[lengther];

                item.element = this.createItem(item, true);
            }

            this[key] = section;
        }

        return this;
    }

    createItem(item, element) {
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
        let { size, price: { finalPrice: price, regularPrice }, name, type } = item;

        size = size === "Normal" ? null : size === 'DoubleWide' ? '500px' : null;
        const render = item.assets && item.assets[0].renderData.Spotlight_Position_Y;

        let banner = item.banner ? new Banner(item.banner).valid ? new Banner(item.banner) : null : null;
        const special = !banner && item.banner ? true : item.assets ? item.assets.length > 1 : false;
        const off = regularPrice - price;
        if(off !== 0) {
            banner = {
                name: `${Intl.NumberFormat().format(off)} V-BUCKS OFF`,
                color: 'purple'
            };
        }
        const inner = `<img src="${asset}" draggable="false"><div>${special ? '<img src="src/images/styles.png">' : ''}<div style="background: ${item.series ? colors.b : rarity ? rarity.colorA : null};"></div><div>${name}<div>${type}</div></div><div><img src="./vbucks.png"><div>${Intl.NumberFormat().format(price)}</div>${regularPrice !== price ? `<div>${Intl.NumberFormat().format(regularPrice)}</div>` : ''}</div></div>${render ? `<div style="background: radial-gradient(circle at ${item.assets[0].renderData.Spotlight_Position_X}% ${item.assets[0].renderData.Spotlight_Position_Y}%, ${item.assets[0].renderData.FallOff_Color.color} 0%, transparent 100%); filter: brightness(${item.assets[0].renderData.Gradient_Hardness});"></div>` : '<div></div>'}${banner ? `<div><div${banner.color ? ' style="border: 3px solid #FF276D;background: #E4116E;color: white;"' : ''}>${banner.name}</div></div>` : ''}`;

        if(element) {
            const div = document.createElement('div');
            div.classList.add('item');

            div.style.cssText = `background: ${render ? '' : 'radial'}-gradient(circle, ${colors.b}, 50%, ${colors.a} 138%);width:${size};`;
            div.innerHTML = inner;

            return div;
        }

        return `<div class="item" style="background: ${render ? '' : 'radial'}-gradient(circle, ${colors.b}, 50%, ${colors.a} 138%);width:${size};">${inner}</div>`;
    }
}

class Shop {
    constructor(data) {
        this.main = $('.main');
        this.sections = new Sections(data);
    }

    addAllPanels() {
        $('.rows').animate({
            opacity: 0
        }, 1500);
        setTimeout(() => {
            $('.rows').empty();
            const keys = Object.keys(this.sections.raw);
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
        const section = panel ? this.sections[type].filter(e => e.categories[0] === panel) : this.sections[type];
        let Panel = null;
        if(!$(`#${panel}-${type}`)[0]) {
            Panel = document.createElement('div');
            Panel.id = `${panel}-${type}`;

            document.getElementsByClassName('rows')[0].appendChild(Panel);
            Panel.innerHTML = `<div></div><div><div id="main-message">loading<div></div></div></div>`;

            if(selected) {
                if($('.main')[0]) $('.main').remove();
                Panel.classList.add('main');
                $('.main').children().eq(1).animate({
                    left: '36px',
                    opacity: 1
                }, 50);
                const timer = setInterval(() => {
                    if($('.main')[0].id !== `${panel}-${type}`) {
                        clearInterval(timer);
                        return;
                    }

                    $('.main').children()[1].children[0].children[0].innerHTML = this.rotation;
                }, 1000);
            }
        }
        let length = section.length;

        while(length--) {
            const item = section[length];
            Panel.children[0].appendChild(item.element);
            if(item.size === 'Small') {
                const infront = section[length - 1];
                if(infront && infront.size === 'Small') {
                    item.element.outerHTML = `<div class="other">${this.sections.createItem(item)}${this.sections.createItem(infront)}</div>`;
                    length--;
                }
            }
        }

        Panel.children[1].children[0].innerHTML = `${section[0].section.name}<div></div>`;
        $('.rows').children().css('position', 'absolute').css('top', '100%');
    }

    switch(e, direction, switching) {
        const next = direction === 'up' ? $('.main').prev() : $('.main').next();
        const element = document.getElementsByClassName('main')[0];
        if(document.getElementsByClassName('main')[1]) document.getElementsByClassName('main')[1].remove();
        if(!next[0]) return;
        switching = true;

        console.log('%c[Shop]', 'color: #7289DA', `Switching to next section, at direction ${direction} (${next[0].id})`);
        $('.main').css('position', 'absolute').animate({
            top: `${direction === 'down' ? '-' : ''}100%`,
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
        if(e) e.preventDefault();
    }

    setEvents() {
        let switching = false;
        const move = this.switch;
        document.onkeydown = function(e) {
            if(switching) return;
            const { key } = e;
            switch(key) {
                case 'ArrowUp': {
                    move(e, 'up', switching);
                } break;
        
                case 'ArrowDown': {
                    move(e, 'down', switching);
                } break;

                case 'PageUp': {
                    move(e, 'up', switching);
                } break;

                case 'PageDown': {
                    move(e, 'down', switching);
                } break;
            }
        };

        const delay = 1350;
        let allow = true;

        document.onwheel = (e) => {
            const direction = e.deltaY < 0 ? 'up' : e.deltaY > 0 ? 'down' : null;

            if(allow && direction) {
                move(e, direction, switching);
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

    get rotation() {
        const minutesRaw = String(59 - new Date().getMinutes());
        const hours = 23 - new Date().getUTCHours();
        const seconds = 60 - new Date().getSeconds() === 60 ? 0 : 60 - new Date().getSeconds();
        const minutes = minutesRaw.length === 1 ? `0${minutesRaw}` : minutesRaw;

        return `${hours !== 0 ? `${hours}:` : ''}${minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
    }
}

$(document).ready(async () => {
    shop = new Shop(await (await fetch(`https://api.blobry.com/data`)).json());
    shop.setShop();

    setInterval(async () => {
        shop = new Shop(await (await fetch(`https://api.blobry.com/data`)).json());
        shop.setShop();
    }, 900000);
});