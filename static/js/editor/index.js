import scale from "../render/var";
import loadColorInputs from "./inputs";
import { rawColors as defaultRawColors, semanticColors as defaultSemanticColors } from "../defaultColors";
import { makeFunctions } from "./theme";

const selectedTheme = {
    custom: undefined,
    discord: "dark"
};

//selectedTheme.custom = await fetch("https://raw.githubusercontent.com/Wizzy-TV/VendettaThemes/main/PixelCity/pixelcity.json").then(r => r.json());


const { getSemanticColor, getRawColor } = makeFunctions(selectedTheme);

const options = {
    getSColor: (k) => getSemanticColor(k, selectedTheme.discord),
    getRColor: (k) => getRawColor(k),
    getBackground: () => selectedTheme.custom?.background,
    ref: { url: "./assets/ref/content.png", alpha: 1 },
    messages: [{
        author: {
            name: "fres",
            avatarUrl: "https://cdn.discordapp.com/avatars/843448897737064448/520512b700da5b93f1ea5bac0d5849e7.png?size=1024"
        },
        timestamp: "Today at 6:21",
        content: [
            { content: 'Welcome to ', type: 'text' },
            { content: 'vd-theme-node', type: 'inlineCode' },
            { content: ' :3', type: 'text' }
        ]
    }],
    channel: {type: 'GC', name: 'hehe'}
}

if (window.location.hostname != "localhost") document.getElementById("ref_alpha_container").style = "display: none;";

function makeSelectedThemeInfo(name, link, authors) {
    document.getElementById("selected-theme-info").innerHTML = "";
    [
        ['span', { }, 'Currently selected: '],
        ['a', { href: link }, name ?? link],
        ['span', {}, ' by ' + authors.map(a=>a.name).join(', ')]
    ].map(([tag, attributes, text]) => {
        let el = document.createElement(tag);
        el.innerText = text;
        Object.keys(attributes).map(a => el.setAttribute(a, attributes[a]));
        document.getElementById("selected-theme-info").appendChild(el);
    });
}

var canvas = document.createElement('iframe');
canvas.onload = function () {
    canvas.contentWindow.canvasOnLoad(() => {
        window.loadTheme = async (uri) => {
            selectedTheme.custom = await fetch(uri).then(r => r.json());
            makeSelectedThemeInfo(selectedTheme.custom.name, uri, selectedTheme.custom.authors);
            update();
            loadColorInputs(selectedTheme, update);
        };
        const input = document.querySelector("#theme_input");
        document.querySelector("#theme_load_btn").addEventListener("click", () => window.loadTheme(input.value))
        update();
        const slider = document.querySelector("#ref_alpha")
        slider.addEventListener("input", function () { 
            options.ref.alpha = slider.value / 100;
            update();
        });
        slider.addEventListener("change", function () { 
            options.ref.alpha = slider.value / 100;
            update();
        });
    });

    window.asd = (o) => canvas.contentWindow.targetFunction(o);
};
canvas.src = 'canvas.html?css=css/embed.css';
canvas.width = scale(720)[0];
canvas.height = scale(1466)[0];
canvas.frameBorder = "0";
canvas.scrolling = "no";
document.querySelector("#canvas_container").appendChild(canvas);

const update = () => canvas.contentWindow.targetFunction(options);

canvas.addEventListener('load', function () {
    canvas.style = `width: ${720/1466*window.innerHeight*0.9}; height: ${window.innerHeight*0.9}`;
});

window.addEventListener('resize', function() {
    canvas.style = `width: ${720/1466*window.innerHeight*0.9}; height: ${window.innerHeight*0.9}`;
});

loadColorInputs(selectedTheme, update);

document.getElementById("nav").addEventListener("click", (e) => {
    const tabName = e.target.dataset.name;
    if (!tabName) return;
    
    document.querySelector(`.tab_content.selected`).classList.remove("selected");
    document.querySelector(`.tab_content[data-name=${tabName}]`).classList.add("selected");
    document.querySelector(`#nav .tab.selected`).classList.remove("selected");
    e.target.classList.add("selected");
});

window.defaultSemanticColors = defaultSemanticColors;
window.defaultRawColors = defaultRawColors;
window.ctheme = selectedTheme.custom;
window.getSemanticColor = getSemanticColor;
window.getRawColor = getRawColor;