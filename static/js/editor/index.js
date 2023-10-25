import { rawColors as defaultRawColors, semanticColors as defaultSemanticColors } from "../defaultColors";
let selectedTheme = await fetch("https://raw.githubusercontent.com/Wizzy-TV/VendettaThemes/main/PixelCity/pixelcity.json").then(r => r.json());

var canvas = document.createElement('iframe');
canvas.onload = function () {
    canvas.contentWindow.canvasOnLoad(() => {
        window.loadTheme = async (uri) => {
            selectedTheme = await fetch(uri).then(r => r.json());
            canvas.contentWindow.targetFunction(({
                getSColor: (k) => getSemanticColor(k, "dark"),
                getRColor: (k) => getRawColor(k),
                getBackground: () => selectedTheme.background
            }));
        };
        const input = document.querySelector("#theme_input");
        document.querySelector("#theme_load_btn").addEventListener("click", () => window.loadTheme(input.value))
        canvas.contentWindow.targetFunction(({
            getSColor: (k) => getSemanticColor(k, "dark"),
            getRColor: (k) => getRawColor(k),
            getBackground: () => selectedTheme.background
        }));
    });

    window.asd = (o) => canvas.contentWindow.targetFunction(o);
};
canvas.src = 'canvas.html';
canvas.width = "360";
canvas.height = "733";
canvas.frameBorder = "0";
canvas.scrolling = "no";
document.body.appendChild(canvas);

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
    return selectedTheme.rawColors?.[key] ||
        defaultRawColors[key]
};
window.getRawColor = getRawColor;