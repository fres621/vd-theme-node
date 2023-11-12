import scale from "../render/var";
import loadColorInputs from "./inputs";
import { rawColors as defaultRawColors, semanticColors as defaultSemanticColors } from "../defaultColors";
import { makeFunctions } from "./theme";

const selectedTheme = {
    custom: undefined,
    discord: "dark",
};

//selectedTheme.custom = await fetch("https://raw.githubusercontent.com/Wizzy-TV/VendettaThemes/main/PixelCity/pixelcity.json").then(r => r.json());

const { getSemanticColor, getRawColor } = makeFunctions(selectedTheme);

const fres = {
    name: "fres",
    avatarUrl: "https://cdn.discordapp.com/avatars/843448897737064448/520512b700da5b93f1ea5bac0d5849e7.png?size=1024",
};

const options = {
    getSColor: (k) => getSemanticColor(k, selectedTheme.discord),
    getRColor: (k) => getRawColor(k),
    getBackground: () => selectedTheme.custom?.background,
    ref: { url: "./assets/ref/preview.png", alpha: 1 },
    messages: [
        {
            author: fres,
            timestamp: "Today at 02:15",
            content: [{ content: "Welcome to vd-theme-node :3", type: "text" }],
        },
        {
            author: fres,
            timestamp: "Today at 02:15",
            content: [{ content: "in this app you can preview Discord RN themes", type: "text" }],
            referencedMessage: {
                author: fres,
                content: [{ content: "Welcome to vd-theme-node :3", type: "text" }],
            },
        },
        {
            content: [{ content: "Soon you'll be able to edit them as well", type: "text" }],
        },
        {
            content: [
                { content: "you can ", type: "text" },
                { content: "load a theme", type: "inlineCode" },
                { content: " from an URL to preview it", type: "text" },
            ],
        },
        {
            content: [{ content: "Star it on Github if it's helpful!", type: "text" }],
        },
        {
            content: [{ content: [{ content: "https://github.com/fres621/vd-theme-node/tree/main", type: "text" }], type: "link" }],
            embeds: [
                {
                    url: "https://github.com/fres621/vd-theme-node/tree/main",
                    type: "article",
                    title: [{ content: [{ content: "GitHub - fres621/vd-theme-node: Vendetta theme preview", type: "text" }], type: "link" }], // [{ content: [{ content: "GitHub - fres621/vd-theme-node: Vendetta theme preview", type: "text" }], type: "link" }]
                    description: [
                        { content: "Vendetta theme preview. Contribute to fres621/vd-theme-node development by creating an account on GitHub.", type: "text" },
                    ],
                    image: {
                        url: "https://opengraph.githubassets.com/b6bc6b437bb4ce6f3631edcd5d2c25b9a3b3fcec181f18c00411108c09146fe3/fres621/vd-theme-node",
                        width: 1200,
                        height: 600,
                    },
                    //borderLeftColor: -14802137, rather let the user preview the default border left color
                    fields: [],
                },
            ],
        },
    ],
    channel: { type: "GC", name: "introduction" },
    pings: 2,
};

if (window.location.hostname != "localhost") document.getElementById("ref_alpha_container").style = "display: none;";

function makeSelectedThemeInfo(name, link, authors) {
    document.getElementById("selected-theme-info").innerHTML = "";
    [
        ["span", {}, "Currently selected: "],
        ["a", { href: link }, name ?? link],
        ["span", {}, " by " + authors.map((a) => a.name).join(", ")],
    ].map(([tag, attributes, text]) => {
        let el = document.createElement(tag);
        el.innerText = text;
        Object.keys(attributes).map((a) => el.setAttribute(a, attributes[a]));
        document.getElementById("selected-theme-info").appendChild(el);
    });
}

var canvas = document.createElement("iframe");
canvas.onload = function () {
    canvas.contentWindow.canvasOnLoad(() => {
        window.loadTheme = async (uri) => {
            selectedTheme.custom = await fetch(uri).then((r) => r.json());
            makeSelectedThemeInfo(selectedTheme.custom.name, uri, selectedTheme.custom.authors);
            update();
            loadColorInputs(selectedTheme, update);
        };
        const input = document.querySelector("#theme_input");
        document.querySelector("#theme_load_btn").addEventListener("click", () => window.loadTheme(input.value));
        update();
        const slider = document.querySelector("#ref_alpha");
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
canvas.src = "canvas.html?css=css/embed.css";
canvas.width = scale(720)[0];
canvas.height = scale(1466)[0];
canvas.frameBorder = "0";
canvas.scrolling = "no";
document.querySelector("#canvas_container").appendChild(canvas);

const update = () => canvas.contentWindow.targetFunction(options);

const getCanvasWidth = () => (720 / 1466) * window.innerHeight * 0.9 * big;
const getCanvasHeight = () => window.innerHeight * 0.9 * big;
const big = 1;
canvas.addEventListener("load", function () {
    canvas.style = `width: ${getCanvasWidth()}; height: ${getCanvasHeight()}`;
});

window.addEventListener("resize", function () {
    canvas.style = `width: ${getCanvasWidth()}; height: ${getCanvasHeight()}`;
});

canvas.contentWindow.addEventListener("mousedown", ({ offsetX, offsetY }) => {
    let interval = [offsetX / Math.floor(getCanvasWidth()), offsetY / Math.floor(getCanvasHeight())];
    console.log(interval);
    console.log(canvas.contentWindow.getHitsFromInterval(...interval));
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
