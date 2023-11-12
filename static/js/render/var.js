const factor = 1;
export default function scale(...a) {
    return a.map((e) => e * factor);
}

export function scaledCtx(ctx) {
    return {
        fillRect: (...a) => ctx.fillRect(...scale(...a)),
        roundRect: (...a) => ctx.roundRect(...scale(...a)),
        fillText: (t, ...a) => ctx.fillText(t, ...scale(...a)),
        setFont: (f) =>
            (ctx.font = f
                .split(" ")
                .map((e) => (e.endsWith("px") ? `${parseFloat(e) * factor}px` : e))
                .join(" ")),
        measureText: (text) => ({ ...ctx.measureText(text), width: ctx.measureText(text).width / factor }),
        arc: (x, y, radius, ...a) => ctx.arc(...scale(x, y, radius), ...a),
        drawImage: (image, ...a) => ctx.drawImage(image, ...scale(...a)),
        translate: (...a) => ctx.translate(...scale(...a)),
        setLineWidth: (v) => (ctx.lineWidth = v * factor),
        scale: (...a) => ctx.scale(...scale(...a)),
    };
}

export function s(n) {
    return n * factor;
}
