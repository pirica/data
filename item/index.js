const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

(async () => {
    const item = await (await fetch(`https://api.blobry.com/data/items/${id}`)).json();

    console.log(item);
    $('body')[0].innerHTML += item.widget.usage.shop;
})();