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
    console.log(pathname.split('/'))
    console.log(pathname.split('/').length)
    if(pathname.split('/').length < 2) return;
    const path = await exist('../index.html');
    if(path) console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
    else console.log('NO POOGGERS NOOOOOO')
})();