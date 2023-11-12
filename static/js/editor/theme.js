/* eslint-disable no-undef */
const semanticAltMap = {
    BG_BACKDROP: "BACKGROUND_FLOATING",
    BG_BASE_PRIMARY: "BACKGROUND_PRIMARY",
    BG_BASE_SECONDARY: "BACKGROUND_SECONDARY",
    BG_BASE_TERTIARY: "BACKGROUND_SECONDARY_ALT",
    BG_MOD_FAINT: "BACKGROUND_MODIFIER_ACCENT",
    BG_MOD_STRONG: "BACKGROUND_MODIFIER_ACCENT",
    BG_MOD_SUBTLE: "BACKGROUND_MODIFIER_ACCENT",
    BG_SURFACE_OVERLAY: "BACKGROUND_FLOATING",
    BG_SURFACE_OVERLAY_TMP: "BACKGROUND_FLOATING",
    BG_SURFACE_RAISED: "BACKGROUND_MOBILE_PRIMARY",
};

const ThemeEnum = { dark: 0, light: 1, amoled: 2, darker: 3 };

export function makeFunctions(selectedTheme) {
    return {
        getSemanticColor: (key, theme) => {
            const getColor = (key) => selectedTheme.custom?.semanticColors?.[key];
            const selectedColor = getColor(key) || getColor(semanticAltMap[key]);

            return selectedColor?.[ThemeEnum[theme]] || theme === "amoled" || theme === "darker"
                ? selectedColor?.[0]
                : selectedTheme.custom?.rawColors?.[defaultSemanticColors[key].source[theme]] || defaultSemanticColors[key].colors[theme];
        },
        getRawColor: (key) => selectedTheme.custom?.rawColors?.[key] || defaultRawColors[key],
    };
}
