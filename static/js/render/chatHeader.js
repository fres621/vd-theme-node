import scale from './var';
import SVG from '../svg';

export default function renderChatHeader({ ctx, w, h }, { getSColor, getRColor }) {
    let bgColor = getSColor("BACKGROUND_MOBILE_SECONDARY");
    let buttonsColor = getSColor("INTERACTIVE_NORMAL");
    let separatorColor = getSColor("BACKGROUND_TERTIARY");
    let pingColor = getSColor("BUTTON_OUTLINE_DANGER_BORDER");
    let pingNumberColor = getRColor("WHITE_500");

    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.shadowColor = separatorColor;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = scale(1.5);
    ctx.fillRect(0, 0, ...scale(720, 105));
    ctx.restore();

    // hamburger icon
    ctx.fillStyle = buttonsColor;
    ctx.fillRect(...scale(37, 42, 33, 4));
    ctx.fillRect(...scale(37, 51.5, 33, 4));
    ctx.fillRect(...scale(37, 61, 33, 4));

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(...scale(78, 65, 21), 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = pingColor;
    ctx.beginPath();
    ctx.arc(...scale(78, 65, 15), 0, 2 * Math.PI);
    ctx.fill();

    ctx.save();
    ctx.font = `bold ${scale(23)}px gg-sans`;
    ctx.fillStyle = pingNumberColor;
    ctx.textAlign = "center";
    let chattext = "2";
    ctx.fillText(chattext, ...scale(78, 73))
    ctx.restore();

    // Buttons on top bar
    ctx.save();
    ctx.fillStyle = buttonsColor;
    if (true) {
        ctx.translate(...scale(477, 30));
        ctx.scale(...scale(1.9, 1.9));
        SVG.call.fill(ctx);
        ctx.translate(43, 0);
        SVG.videocall.fill(ctx);
        ctx.translate(44, 0);
        SVG.members.fill(ctx);
    } else { // icons for server header instead of dm
        ctx.translate(...scale(462, 30));
        ctx.scale(1.9 * size, 1.9 * size);
        ctx.fill(new Path2D(SVGs.threads[0]));
        ctx.fill(new Path2D(SVGs.threads[1]));
        ctx.translate(47.5, 0);
        ctx.fill(new Path2D(SVGs.search));
        ctx.translate(47, 0);
        ctx.fill(new Path2D(SVGs.members[0]));
        ctx.fill(new Path2D(SVGs.members[1]));
        ctx.fill(new Path2D(SVGs.members[2]));
    };
    ctx.restore();
};