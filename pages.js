/**
 * Creates a Blobry transition between different pages.
 */
class Page {
    constructor(configuration = {
        content: null,
        color: null,
        direction: null,
        delay: 1000,
        id: null,
        url: null
    }) {
        this.configuration = configuration;
    }

    transition() {
    if($(`#transition-${this.configuration.direction}-${this.configuration.color}`)[0]) $(`#transition-${this.configuration.direction}-${this.configuration.color}`).remove();
        const div = document.createElement('div');
        div.id = `transition-${this.configuration.direction}-${this.configuration.color}`;
        div.style.cssText = 'transform: translate(-50%,-50%);top: 50%;left: 50%;position: absolute;display: flex;justify-content: center;z-index: 1;';
        div.innerHTML = `<svg id="transition-${this.configuration.direction}" viewBox="0 0 200 200" width="0"><path fill="#6175B7" d="M44.6,-76.2C58.4,-69.2,70.7,-58.6,78.5,-45.3C86.3,-32,89.6,-16,89.2,-0.2C88.8,15.5,84.7,31,77.2,44.7C69.6,58.5,58.5,70.4,45.1,77.4C31.7,84.4,15.8,86.6,-0.4,87.3C-16.7,88,-33.3,87.3,-46.7,80.3C-60.1,73.2,-70.3,59.8,-77.3,45.4C-84.4,31,-88.3,15.5,-88.2,0C-88.2,-15.4,-84.1,-30.8,-76.7,-44.6C-69.3,-58.4,-58.5,-70.5,-45.1,-77.8C-31.8,-85.2,-15.9,-87.7,-0.3,-87.2C15.4,-86.8,30.7,-83.3,44.6,-76.2Z" transform="translate(100 100)"></path></svg>`;
        document.body.appendChild(div);
        setTimeout(() => {
            const data = document.createElement('div');
            document.body.appendChild(data);
            data.outerHTML = this.configuration.content;
            $(`#${this.configuration.id}`).animate({
                opacity: 1
            }, 500);
        }, 600);
        $(`#transition-${this.configuration.direction}`).animate({
            width: '1600vh'
        }, 1000);

        // setTimeout(() => {
        //     window.location.href = this.configuration.url;
        // }, 2000);
    }
}