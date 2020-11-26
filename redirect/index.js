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
    const path = await exist('../index.html');
    if(path) console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
    else {
        window.location.href = 'https://data.blobry.com/redirect/404.html';
    };
})();