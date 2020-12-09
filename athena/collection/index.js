// const character = new Character();

const osM = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;

class Character {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.images = data.images;
        this.description = data.description;
        this.index = data.index;
        this.offers = data.offers;
        this.locations = data.locations;
    }
}

let characters = null;

class Characters {
    constructor(characters) {
        this.collection = [];
        this.character = null;
        this.element = $('.character');

        if(localStorage.collection) {
            try {
                const json = JSON.parse(localStorage.collection);
                this.switch(characters.find(e => e.name === json.latest));
            } catch(err) {
                $('.character').css('display', 'none');
                $('.error').css('display', '');
                $('.error').children()[0].innerHTML = 'ok';
                $('.error').children()[1].innerHTML = 'ok';
                return;
            }
        }

        this.setCollection(characters);

        if(osM) {
            document.head.innerHTML += '<link rel="stylesheet" href="./mobile.css">';
            this.createElement('div', document.getElementsByClassName('character')[0], '<div>←</div>');
            this.element.children()[4].onclick = () => {
                this.element.css('opacity', '0');
                this.element.css('z-index', '-1');
            };
        }

        $('.location').click(() => {
            $('.location').css('display', 'none');
        });
    }

    async switch(character) {
        if(this.character && this.character.changing || this.character === character) return;
        if(this.character) this.character.changing = true;

        if(!this.character) {
            this.element.children()[1].style.top = '52%';
            await this.wait(200);
            this.element.children()[1].style.display = 'none';
            this.createElement('img', document.getElementsByClassName('character')[0], `<img draggable="false">`);
        }
        
        this.element.children('img').attr('style', 'transform: scale(0.9);position: relative;top: 33px;');
        this.element.children('img').attr('src', character.images.full_size);
        await this.wait(200);
        this.element.children('img').attr('style', 'position: relative;top: 10px;');

        if(this.character) $(`[id="${this.character.name}"]`).css('boxShadow', '');

        $(`[id="${character.name}"]`).css('boxShadow', 'white 0px 0px 0px 3px, 5px 5px 30px');

        characters.element.children().eq(3).css('display', 'block').children()[0].innerHTML = character.name;

        if(osM) {
            this.element.css('opacity', '1');
            this.element.css('z-index', '1');
        }

        if(character.locations) {
            let locations = this.element.children()[3].children[1];
            let length = 0;

            locations.outerHTML = '<div><div><div></div><div></div></div><div><div></div><div></div></div><div><div></div><div></div></div></div>';

            locations = this.element.children()[3].children[1];
            while(length < character.locations.length) {
                length++;

                const location = character.locations[length - 1];

                locations.children[length - 1].innerHTML = `<div></div><div>${location.name || location.id}</div>`;
                locations.children[length - 1].children[0].style.background = '#0042FF';

                locations.children[length - 1].onclick = () => {
                    if(!location.images) return;

                    $('.location').css('display', 'flex');
                    $('.location').children()[0].src = location.images[0].url;
                    $('.location').children()[1].src = character.images.full_size || character.portrait;
                    $('.location').children()[3].children[0].innerText = location.name;
                    $('.location').children()[3].children[1].innerText = location.id;
                };
            }
        }

        this.character = character;
        this.character.changing = false;
        localStorage.collection = JSON.stringify({
            tracking: {},
            latest: character.name
        });
    }

    createElement(type, parent=document.getElementsByClassName('character')[0], outerHTML=null) {
        const element = document.createElement(type);
        
        parent.appendChild(element);

        if(outerHTML) element.outerHTML = outerHTML;

        return element;
    }

    setCollection(characters) {
        let length = characters.length;

        while(length--) {
            const character = new Character(characters[length]);
            this.collection.push(character);
            const div = document.createElement('div');
            div.id = character.name;
    
            div.onclick = () => {
                this.switch(character);
            };
    
            div.innerHTML = `<img src="${character.images.icon || character.portrait}"><div></div>`;
    
            document.getElementsByClassName('characters')[0].appendChild(div);
        }
    }

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

$(document).ready(async () => {
    $('.character').css('display', 'none');
    $('.error').css('display', '');
    $('.error')[0].outerHTML = '<div class="error" style="width: 70%;font-size: 100%;height: 52%;"><div style="color: white;">Epic Games, Inc. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine 4 and trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. All rights reserved.<div class="button" style="width: 310px;position: relative;left: 50%;transform: translate(-50%, -50%) skew(-13deg, -1deg);top: 50%;background: radial-gradient(#0042E5 28%, #002581 180%);" id="bruh-momento"><div>ok bruh</div></div></div></div>';
    $('#bruh-momento').click(async () => {
        $('.error').fadeOut();
        try {
            const data = await (await fetch(`https://api.blobry.com/characters?lang=${new URL(location.href).searchParams.get('lang') || 'en'}`)).json();
            if(data.error) {
                $('.character').css('display', 'none');
                $('.error')[0].style.cssText = '';
                $('.error').children()[0].innerHTML = data.error;
                $('.error').children()[1].innerHTML = data.message;
            }
            else characters = new Characters((data).reverse());
            $('.character').css('display', '');
        } catch(err) {
            $('.character').css('display', 'none');
            $('.error')[0].style.cssText = '';
            $('.error')[0].innerHTML = '<div></div><div></div>'
            $('.error').children()[0].innerHTML = 'Dog Shit Code Moment';
            $('.error').children()[1].innerHTML = err;
        }
    })
});