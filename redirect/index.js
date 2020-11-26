const { origin, pathname } = window.location;
const exist = async (path) => {
    let response = true;
    try {
        await fetch(path);
        response = true;
    } catch(e) {
        response = false;
    }
    
    return response;
};

(async () => {
    // const path = await exist('../index.html');
    console.log(pathname);
    try {
        (await fetch('/index.html')).status !== 404;
    } catch(err) {
        window.location.href = 'https://data.blobry.com/redirect/404.html';
    }
    console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
})();