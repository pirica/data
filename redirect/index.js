const { origin, pathname } = window.location;
const exist = (path) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', path, false);
    xhr.send();
    console.log(xhr)
    
    return xhr.status !== 404;
};

$(document).ready(async () => {
    const four = async () => {
        const page = await (await fetch('https://data.blobry.com/redirect/404.html')).text();
        document.open('text/html');
        document.write(page);
        document.close();
    }
    if(pathname.split('/').length === 2) await four();
    const path = exist('./index.html');
    if(path) {
        const data = await (await fetch('./index.html')).text();
        const tags = data.split('<head>')[1].split('</head>')[0].trim().split('<').filter(e => e && !e.startsWith('/'));
        const body = data.split('<body>')[1].split('</body>')[0];
        let length = tags.length;

        while(length--) {
            const tag = `<${tags[length]}</${tags[length].split(' ')[0]}>`;
            const other = tag.split(`<${tags[length].split(' ')[0]} `)[1].split(`</${tags[length].split(' ')[0]}>`)[0].split('>')[0].split(' ').map(e => {return {type: e.split('"')[0].split('=')[0], value: e.split('"')[1]}});
            const element = document.createElement(tags[length].split(' ')[0].toLowerCase());

            for (let i = 0; i < other.length; i++) {
                const tagI = other[i];
                element[tagI.type] = tagI.value;
            }

            if(tags[length].split(' ')[0].toLowerCase() === 'script') eval(await (await fetch(other.find(e => e.type === 'src').value)).text());

            document.getElementsByTagName('head')[0].appendChild(element);
        }

        $('body')[0].innerHTML = body;
        console.log('%c[DATA]', 'color: #7289DA', `You're going to the correct destination!`);
    }
    else await four();
});