const { origin, pathname } = window.location;
const exist = (path) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', path);
    xhr.send();
    
    return xhr.status !== 404;
};

(async () => {
    const path = exist('./index.html');
    console.log(pathname);
    if(path) console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
    else  window.location.href = 'https://data.blobry.com/redirect/404.html';
    
})();