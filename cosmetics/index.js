const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

(async () => {
    try {
        const item = await (await fetch(`https://api.blobry.com/data/items/${id}`)).json();

        $('#blob').remove();
        $('.center')[0].innerHTML += item.widget.usage.small;
        $('.center')[0].innerHTML += item.widget.usage.section;
        $('.center')[0].innerHTML += item.widget.usage.shop;
        console.log(item);
    } catch(err) {
        $('path').css('fill', '#6175B7');
        $('.message').html('An error occurred, check console for more information.');
    }
})();