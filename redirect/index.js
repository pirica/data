const { origin, pathname } = window.location;
const exist = async (path) => {
    try {
        return await (await fetch(path)).status !== 404;
    } catch(e) {
        return false;
    }
};

(async () => {
    console.log(await exist('index.html'));
})();