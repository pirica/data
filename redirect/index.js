const { origin, pathname } = window.location;
const exist = (path) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', path, false);
    xhr.send();
    console.log(xhr)
    
    return xhr.status !== 404;
};

$(document).ready(async () => {
    if(pathname.split('/').length === 2) window.location.href = 'https://data.blobry.com/redirect/404.html';
    const path = exist('./index.html');
    if(path) {
        console.log('Loading Data');
        const data = await (await fetch('./index.html')).text();
        document.open('text/html');
        document.write(data);
        document.close();
    }
    else window.location.href = 'https://data.blobry.com/redirect/404.html'; 
});