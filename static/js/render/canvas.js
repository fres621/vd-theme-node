import scale from './var';
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

// :33

window.setmessages = async () => { };

function renderCanvas(base_image, options) {
    console.log("options", options);
    
    // Get the canvas element
    const canvas = document.getElementById('textCanvas');
    const [w,h] = [canvas.width, canvas.height];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    renderChat({ ctx, w, h }, options);
    renderChatInputBar({ ctx, w, h }, options);

    ctx.save();
    ctx.globalAlpha = 0.7;
    //ctx.drawImage(base_image, 0, 0, w, h);
    ctx.restore();
};

let options = {
    getSColor: (k)=>getSemanticColor(k, "dark"),
    getRColor: (k) => getRawColor(k, "dark"),
    getBackground: ()=>undefined
};
window.options = options;

let loadedImages = {};

(async () => {
    let f1 = new FontFace("gg-sans", "url(assets/fonts/ggsans-Normal.ttf)", {
        style: "normal",
        weight: 400
    });
    document.fonts.add(f1);
    await f1.load();

    let base_image = new Image();
    base_image.src = 'assets/ss.png';
    base_image.onload = function () {
        renderCanvas(base_image, options);
        window._isCanvasLoaded = true;
        window._onLoadCallbacks.forEach(cb => cb());
    }
    window.targetFunction = (o) => {
        let bg = o.getBackground();
        let bguri = bg?.url;
        if (bguri) {
            if (!loadedImages[bguri]) {
                let bg_image = new Image();
                bg_image.src = bguri;
                loadedImages[bguri] = bg_image;
                bg_image.onload = function () {
                    renderCanvas(base_image, { ...o, getBackground: () => ({ ...bg, image: bg_image }) });
                }
            } else {
                renderCanvas(base_image, { ...o, getBackground: () => ({ ...bg, image: loadedImages[bguri] }) });
            }
        } else {
            renderCanvas(base_image, o);
        };
    };
})();