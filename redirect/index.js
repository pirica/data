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
    const path = await exist('../index.html');
    if(path) console.log('POGGERS this directory exists!!!!!!!!!!!!!!!!!!!!!!!!!!');
    else console.log('NO POOGGERS NOOOOOO')
})();