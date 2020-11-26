const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

class UI {
    constructor() {
        this.color = Cookies.get('color') || this.pagecolor();
        this.setColor();

        $('#color').click(() => {
            return this.setColor(this.color === 'white' ? 'gray' : 'white');
        });
    }

    setColor(color=this.color) {
        this.color = color;
        Cookies.set('color', color);
        switch(color) {
            case 'white': {
                document.getElementsByTagName('html')[0].classList.add('white');
                $('html').css('color', '');
                $('.colorchange').children()[0].innerText = 'GRAY';
            } break;

            case 'gray': {
                document.getElementsByTagName('html')[0].classList.remove('white');
                $('.colorchange').children()[0].innerText = 'WHITE';
                $('html').css('color', 'white');
            } break;

            default: {
                console.log(`Unknown color: ${color}`);
                return this.setColor('white');
            } break;
        }
        return this;
    }

    pagecolor() {
        const hours = (new Date()).getHours();
        return (hours >= 6 && hours < 20) ? 'white' : 'black';
    }
}

(async () => {
    new UI();
    try {
    const item = await (await fetch(`https://api.blobry.com/data/items/${id}`)).json();
    console.log(item);
    $('body')[0].innerHTML += item.widget.usage.shop;
    } catch(err) {
        $('path').css('fill', '#6175B7');
        $('.message').html('An error occurred, check console for more information.');
    }
})();