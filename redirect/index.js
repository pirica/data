const { origin, pathname } = window.location;
const exist = async (path) => {
    try {
        await fetch(path);
        return true;
    } catch(e) {
        return false;
    }
};

(async () => {
    if(pathname.split('/').length === 2) return;
    const path = await exist('../index.html');
    if(path) console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
    else {
        window.location.href = 'https://data.blobry.com/redirect/404.html';
    };
})();