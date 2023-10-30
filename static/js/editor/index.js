import scale from "../render/var";
import { rawColors as defaultRawColors, semanticColors as defaultSemanticColors } from "../defaultColors";
//let selectedTheme = await fetch("https://raw.githubusercontent.com/Wizzy-TV/VendettaThemes/main/PixelCity/pixelcity.json").then(r => r.json());
let selectedTheme = undefined;
let options = {
    getSColor: (k) => getSemanticColor(k, "dark"),
    getRColor: (k) => getRawColor(k),
    getBackground: () => selectedTheme?.background,
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
        ['span', {}, ' by ' + authors.map(a=>a.name).join(',')]
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
            selectedTheme = await fetch(uri).then(r => r.json());
            makeSelectedThemeInfo(selectedTheme.name, uri, selectedTheme.authors);
            canvas.contentWindow.targetFunction(options);
            loadColorInputs();
        };
        const input = document.querySelector("#theme_input");
        document.querySelector("#theme_load_btn").addEventListener("click", () => window.loadTheme(input.value))
        canvas.contentWindow.targetFunction(options);
        const slider = document.querySelector("#ref_alpha")
        slider.addEventListener("input", function () { 
            options.ref.alpha = slider.value / 100;
            canvas.contentWindow.targetFunction(options);
        });
        slider.addEventListener("change", function () { 
            options.ref.alpha = slider.value / 100;
            canvas.contentWindow.targetFunction(options);
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

canvas.addEventListener('load', function () {
    canvas.style = `width: ${720/1466*window.innerHeight*0.9}; height: ${window.innerHeight*0.9}`;
});

window.addEventListener('resize', function() {
    canvas.style = `width: ${720/1466*window.innerHeight*0.9}; height: ${window.innerHeight*0.9}`;
});

function loadColorInputs() {
    let inputs = document.getElementById("inputs");
    inputs.innerHTML = "";
    if (!selectedTheme) selectedTheme = { semanticColors: {} };
    if (!selectedTheme.semanticColors) selectedTheme.semanticColors = {};
    Object.keys(selectedTheme.semanticColors).forEach(key => {
        const div = document.createElement("div");
        div.className = "color_input";

        const input = document.createElement("input");
        input.type = "color";
        input.value = selectedTheme.semanticColors[key]?.[0] || defaultSemanticColors[key]?.[0];
        input.dataset.key = key;
        input.addEventListener("input", () => {
            selectedTheme.semanticColors[key] = [input.value];
            canvas.contentWindow.targetFunction(options);
        });
        div.appendChild(input);

        const p = document.createElement("p");
        p.textContent = key;
        div.appendChild(p);

        inputs.appendChild(div);
    });
};
loadColorInputs();

document.getElementById("nav").addEventListener("click", (e) => {
    let tabName = e.target.dataset.name;
    if (!tabName) return;
    
    document.querySelector(`.tab_content.selected`).classList.remove("selected");
    document.querySelector(`.tab_content[data-name=${tabName}]`).classList.add("selected");
    document.querySelector(`#nav .tab.selected`).classList.remove("selected");
    e.target.classList.add("selected");
});

window.defaultSemanticColors = defaultSemanticColors;
window.defaultRawColors = defaultRawColors;
window.ctheme = selectedTheme;

const semanticAltMap = {
    "BG_BACKDROP": "BACKGROUND_FLOATING",
    "BG_BASE_PRIMARY": "BACKGROUND_PRIMARY",
    "BG_BASE_SECONDARY": "BACKGROUND_SECONDARY",
    "BG_BASE_TERTIARY": "BACKGROUND_SECONDARY_ALT",
    "BG_MOD_FAINT": "BACKGROUND_MODIFIER_ACCENT",
    "BG_MOD_STRONG": "BACKGROUND_MODIFIER_ACCENT",
    "BG_MOD_SUBTLE": "BACKGROUND_MODIFIER_ACCENT",
    "BG_SURFACE_OVERLAY": "BACKGROUND_FLOATING",
    "BG_SURFACE_OVERLAY_TMP": "BACKGROUND_FLOATING",
    "BG_SURFACE_RAISED": "BACKGROUND_MOBILE_PRIMARY"
}

const ThemeEnum = {dark: 0, light: 1, amoled: 2, darker:3 };

// Returns hex string for color
function getSemanticColor(key, theme) {
    const getColor = (key) => selectedTheme?.semanticColors?.[key];
    const selectedColor = getColor(key) || getColor(semanticAltMap[key]);

    return selectedColor?.[ThemeEnum[theme]] ||
        (theme === 'amoled' || theme === 'darker') ?
        selectedColor?.[0] : 
        selectedTheme?.rawColors?.[defaultSemanticColors[key].source[theme]] ||
        defaultSemanticColors[key].colors[theme]
};

window.getSemanticColor = getSemanticColor;

function getRawColor(key) {
    return selectedTheme?.rawColors?.[key] ||
        defaultRawColors[key]
};
window.getRawColor = getRawColor;