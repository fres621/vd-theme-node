import { rawColors, semanticColors } from "../defaultColors";

export default function loadColorInputs(selectedTheme, update) {
    let inputs = document.getElementById("inputs");
    inputs.innerHTML = "";
    if (!selectedTheme.custom) selectedTheme.custom = { semanticColors: {}, rawColors: {} };
    if (!selectedTheme.custom.semanticColors) selectedTheme.custom.semanticColors = {};
    if (!selectedTheme.custom.rawColors) selectedTheme.custom.rawColors = {};
    const semanticInput = document.createElement("div");
    {
        const header = document.createElement("h2");
        header.innerText = "Semantic Colors";
        semanticInput.appendChild(header);
    };
    Object.keys(semanticColors).filter(color => selectedTheme.custom.semanticColors[color]).forEach(key => {
        const div = document.createElement("div");
        div.className = "color_input";

        const input = document.createElement("input");
        input.type = "color";
        input.value = selectedTheme.custom.semanticColors[key]?.[0] || semanticColors[key]?.[0];
        input.dataset.key = key;
        input.addEventListener("input", () => {
            selectedTheme.custom.semanticColors[key] = [input.value];
            update();
        });
        div.appendChild(input);

        const p = document.createElement("p");
        p.textContent = key;
        div.appendChild(p);

        semanticInput.appendChild(div);
    });
    inputs.appendChild(semanticInput);

    const rawInput = document.createElement("div");
    {
        const header = document.createElement("h2");
        header.innerText = "Raw Colors";
        rawInput.appendChild(header);
    };
    Object.keys(rawColors).filter(color => selectedTheme.custom.rawColors[color]).forEach(key => {
        const div = document.createElement("div");
        div.className = "color_input";

        const input = document.createElement("input");
        input.type = "color";
        input.value = selectedTheme.custom.rawColors[key] || rawColors[key];
        input.dataset.key = key;
        input.addEventListener("input", () => {
            selectedTheme.custom.rawColors[key] = input.value;
            update();
        });
        div.appendChild(input);

        const p = document.createElement("p");
        p.textContent = key;
        div.appendChild(p);

        rawInput.appendChild(div);
    });
    inputs.appendChild(rawInput);
};