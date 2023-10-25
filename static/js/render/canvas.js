import scale from './var';
import renderChatHeader from './chatHeader';
import renderChatInputBar from './chatInputBar';
import renderChat from './chat';
import { rawColors, semanticColors } from '../defaultColors';

// Returns hex string for color
function getSemanticColor(key, theme) {
    return semanticColors[key].colors[theme]
};

function getRawColor(key) {
    return rawColors[key]
};

function tryDrawRef({ctx, w, h}, { ref }) {
    ctx.save();
    ctx.globalAlpha = ref.alpha;
    ctx.drawImage(ref.image, 0, 0, w, h);
    ctx.restore();
}

// :33

const canvas = document.createElement('canvas');
canvas.width = scale(720)[0];
canvas.height = scale(1466)[0];
document.body.appendChild(canvas);


window.setmessages = async () => { };

function renderCanvas(options) {
    console.log("options", options);
    
    // Get the canvas element
    const [w,h] = [canvas.width, canvas.height];
    const ctx = canvas.getContext('2d');
    let render = (f)=>f({ ctx, w, h }, options);
    ctx.clearRect(0, 0, w, h);

    render(renderChat);
    render(renderChatInputBar);
    render(renderChatHeader);

    options.ref?.image && render(tryDrawRef);
};

let options = {
    getSColor: (k)=>getSemanticColor(k, "dark"),
    getRColor: (k) => getRawColor(k, "dark"),
    getBackground: ()=>undefined
};
window.options = options;

let loadedImages = {};

async function loadImage(uri) {
    return new Promise(res => { 
        if (!uri) return res(null);
        if (loadedImages[uri]) return res(loadedImages[uri]);
        let img = new Image();
        img.src = uri;
        loadedImages[uri] = img;
        img.onload = function () {
            return res(img);
        }
        img.onerror = function () {
            return res(null);
        }
    });
}

(async () => {
    let f1 = new FontFace("gg-sans", "url(assets/fonts/ggsans-Normal.ttf)", {
        style: "normal",
        weight: 400
    });
    document.fonts.add(f1);
    await f1.load();

    window.targetFunction = async (o) => {
        let bg = o.getBackground();
        let bgimage = await loadImage(bg?.url);
        let refimage = await loadImage(o.ref?.url);
        renderCanvas({ ...o, getBackground: () => ({ ...bg, image: bgimage }), ref: { ...o.ref, image: refimage } });
    };

    renderCanvas(options);
    window._isCanvasLoaded = true;
    window._onLoadCallbacks.forEach(cb => cb());
})();