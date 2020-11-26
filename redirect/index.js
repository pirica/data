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
        let length = tags.length;

        while(length--) {
            const tag = tags[length];
            console.log(tag);
        }
        console.log('%c[DATA]', 'color: #7289DA', `You're going to the correct destination!`);
        // dat
        // document.open('text/html');
        // document.write(data);
        // document.close();
    }
    else await four();
});