export default function loadColorInputs(selectedTheme, update) {
    let inputs = document.getElementById("inputs");
    inputs.innerHTML = "";
    if (!selectedTheme.custom) selectedTheme.custom = { semanticColors: {} };
    if (!selectedTheme.custom.semanticColors) selectedTheme.custom.semanticColors = {};
    Object.keys(selectedTheme.custom.semanticColors).forEach(key => {
        const div = document.createElement("div");
        div.className = "color_input";

        const input = document.createElement("input");
        input.type = "color";
        input.value = selectedTheme.custom.semanticColors[key]?.[0] || defaultSemanticColors[key]?.[0];
        input.dataset.key = key;
        input.addEventListener("input", () => {
            selectedTheme.custom.semanticColors[key] = [input.value];
            canvas.contentWindow.targetFunction(options);
        });
        div.appendChild(input);

        const p = document.createElement("p");
        p.textContent = key;
        div.appendChild(p);

        inputs.appendChild(div);
    });
};