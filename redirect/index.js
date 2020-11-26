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
    console.log(await exist(pathname));
})();