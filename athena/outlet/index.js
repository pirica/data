const osM = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
let shop = null;

let keys = '';

window.onkeypress = ({key}) => {
    keys += key;
    if(keys === 'blobry') {
        console.log('%c[Shop]', 'color: #7289DA', `Debug has been activated.`);
        clearInterval(inv);
    }
};

let inv = setInterval(() => {
    keys = '';
}, 2000);

class Tags {
    constructor(granted) {
        this.set(granted);
        this.enabled = this.Cosmetics ? this.Cosmetics.UserFacingFlags ? this.Cosmetics.UserFacingFlags.HasVariants || this.Cosmetics.UserFacingFlags.Reactive ? true : false : false : false;
    }

    set(granted) {
        let length = granted.length;

        while(length--) {
            const tags = granted[length].gameplayTags;
            let amount = tags.length;

            while(amount--) {
                const tag = tags[amount];
                tag.split('.').reduce((r, a) => r[a] = r[a] || {}, this);
            }
        }

        return this;
    }
}

class Banner {
    constructor(banner) {
        const hidden = ['reactive', 'variants', 'styles', 'traversal'];
        this.id = banner.id;
        this.name = banner.name;
        this.intensity = banner.intensity;
        this.data = banner.data;
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
                const infront = section[lengther - 1];

                this.createItem(item, item.size.type === 'Small' && infront && infront.size.type === 'Small' ? infront : null);
            }

            this[key] = section;
        }

        return this;
    }

    createItem(item, infront) {
        const div = document.createElement('div');

        const event = (item, element) => () => {
            item.owned = item.owned ? false : true;
            const last = element.children[1].children[element.children[1].children.length - 1];

            item.owned ? last.setAttribute('data-owned', 'true') : last.removeAttribute('data-owned');
        };
                
        const { size: { width, type: tileSize }, price: { finalPrice: price, regularPrice }, name, type, rarity, assets } = item;
        const banner = item.banner ? new Banner(item.banner).valid ? new Banner(item.banner) : null : null;
        const render = assets && assets[0].renderData.Spotlight_Position_Y;
        const tags = new Tags(item.granted);

        let colors = {};
        let asset = null;

        if(assets) {
            if(assets[0].renderData.Background_Color_A) {
                const { Background_Color_A: { color: a }, Background_Color_B: { color: b } } = assets[0].renderData;
                asset = assets[0].url;
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
        }
        else {
            if(rarity) colors = {
                a: rarity.colorA,
                b: rarity.colorB
            };
            asset = '';
        }

        if(tileSize === 'Small' && infront && infront.size.type === 'Small') {
            div.classList.add('other');
            const itemElement = this.createItem(item);
            const InfrontElement = this.createItem(infront).cloneNode(true);
            InfrontElement.onclick = event(infront, InfrontElement);
            itemElement.onclick = event(item, itemElement);
            div.appendChild(itemElement);
            div.appendChild(InfrontElement);
        }

        else {
            div.classList.add('item');

            div.style.cssText = `background: ${render ? '' : 'radial'}-gradient(circle, ${colors.b}, 50%, ${colors.a} 138%);width:${width};`;
            div.innerHTML = `<img src="${asset}" draggable="false"><div>${tags.enabled ? '<img src="src/images/styles.png">' : ''}<div style="background: ${item.series ? colors.b : rarity ? rarity.colorA : null};"></div><div>${name}<div>${type}</div></div><div><img src="./vbucks.png"><div>${Intl.NumberFormat().format(price)}</div>${regularPrice !== price ? `<div>${Intl.NumberFormat().format(regularPrice)}</div>` : ''}</div></div>${render ? `<div style="background: radial-gradient(circle at ${item.assets[0].renderData.Spotlight_Position_X}% ${item.assets[0].renderData.Spotlight_Position_Y}%, ${item.assets[0].renderData.FallOff_Color.color} 0%, transparent 100%); filter: brightness(${item.assets[0].renderData.Gradient_Hardness});"></div>` : '<div></div>'}${banner ? `<div><div style="left: 0;border: 3px solid ${banner.data.border};background: ${banner.data.background};color: ${banner.data.color};">${banner.name}</div></div>` : ''}`;
        }

        item.element = div;
        if(!infront) div.onclick = event(item, div);

        return div;
    }
}

class Shop {
    constructor(data) {
        this.main = $('.main');
        this.sections = new Sections(data);
    }

    log(message) {
        console.log('%c[Shop]', 'color: #7289DA', message);
    }

    addAllPanels() {
        const add = () => {
            $('.rows').empty();
            const keys = Object.keys(this.sections.raw);
            const section = localStorage.getItem('section');
            let length = keys.length;
    
            while(length--) {
                const key = keys[length];
                this.setPanel(key, section === key && !$('.main')[0] || length === keys.length - 1 && !$('.main')[0]);
            }
    
            this.setEvents();

            $('.rows').animate({
                opacity: 1
            }, 500);
        };
        if(new URLSearchParams(window.location.search.split('?')[1]).get('transition') === 'true') {
            $('.rows').animate({
                opacity: 0
            }, 1500);
            setTimeout(() => {
                add();
            }, 1500);
        }
        else add();
    }

    setPanel(type, selected=false) {
        const section = this.sections[type];
        let Panel = null;
        if(!$(`#${type}`)[0]) {
            Panel = document.createElement('div');
            Panel.id = type;

            document.getElementsByClassName('rows')[0].appendChild(Panel);
            Panel.innerHTML = `<div></div><div><div id="main-message">loading<div></div></div></div>`;

            if(selected) {
                if($('.main')[0]) $('.main').remove();
                Panel.classList.add('main');
                $('.main').children().eq(1).animate({
                    left: '36px',
                    opacity: 1
                }, 50);
                setTimeout(() => {
                    this.setRowAnimationLoad($('.main'));
                }, 200);
            }
        }
        let length = section.length;

        while(length--) {
            const item = section[length];
            Panel.children[0].appendChild(item.element);
            if(item.size.type === 'Small' && section[length - 1] && section[length - 1].size.type === 'Small') {
                length--;
            }
        }

        Panel.children[1].children[0].innerHTML = section[0].section.name;
        $('.rows').children().css('position', 'absolute').css('top', '100%');
    }

    switch(direction, switching) {
        const next = direction === 'up' ? $('.main').prev() : $('.main').next();
        const element = document.getElementsByClassName('main')[0];
        if(document.getElementsByClassName('main')[1]) document.getElementsByClassName('main')[1].remove();
        if(!next[0]) return;
        switching = true;

        this.log(`Switching to next section, at direction ${direction} (${next[0].id})`);
        $('.main').css('position', 'absolute').animate({
            top: `${direction === 'down' ? '-' : ''}100%`,
            opacity: 0.5
        }, 150);
        this.setRowAnimationCancel();
        next.css('position', 'absolute').animate({
            top: '0px',
            opacity: 1
        }, 150);
        next.children().eq(1).css('left', '').css('opacity', '0');
        setTimeout(() => {
            next[0].style.cssText = '';
            next[0].classList.add('main');
            switching = false;
            next.children().eq(1).animate({
                left: '36px',
                opacity: 1
            }, 50);
            this.setRowAnimationLoad(next);
        }, 150);
        element.classList.remove('main');

        localStorage.setItem('section', next[0].id);
    }

    setRowAnimationLoad(row) {
        Array.from(row.children()[0].children).filter(e => e.children[3]).forEach((e) => e.children[3].children[0].style.left = '');
        return Array.from(row.children()[0].children).filter(e => e.className === 'other').forEach((e) => Array.from(e.children).filter(e => e.children[3])[0] ? Array.from(e.children).filter(e => e.children[3])[0].children[3].children[0].style.left = '' : null);
    }

    setRowAnimationCancel(row=$('.main')) {
        Array.from(row.children()[0].children).filter(e => e.children[3]).forEach((e) => e.children[3].children[0].style.left = '0');
        return Array.from(row.children()[0].children).filter(e => e.className === 'other').forEach((e) => Array.from(e.children).filter(e => e.children[3])[0] ? Array.from(e.children).filter(e => e.children[3])[0].children[3].children[0].style.left = '0' : null);
    }

    setEvents() {
        let switching = false;
        const cls = this;
        document.onkeydown = function(e) {
            if(switching) return;
            const { key } = e;
            switch(key) {
                case 'ArrowUp': {
                    cls.switch('up', switching);
                } break;
        
                case 'ArrowDown': {
                    cls.switch('down', switching);
                } break;

                case 'PageUp': {
                    cls.switch('up', switching);
                } break;

                case 'PageDown': {
                    cls.switch('down', switching);
                } break;
            }
        };

        const delay = 1350;
        let allow = true;

        document.onwheel = (e) => {
            const direction = e.deltaY < 0 ? 'up' : e.deltaY > 0 ? 'down' : null;

            if(allow && direction) {
                cls.switch(direction, switching);
                allow = false;
                setTimeout(() => {
                    allow = true;
                }, delay);
            }
        }
        // window.onscroll = (e) => {
        //     console.log('s')
        // };

        let scroll_position = 0;
let scroll_direction;

window.addEventListener('scroll', function(e){
    scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
    scroll_position = (document.body.getBoundingClientRect()).top;
    alert(scroll_direction);
});

$(document).on('scrollstart', () => {
    alert('sdsfd')
})
    }
    
    setShop() {
        this.addAllPanels();
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