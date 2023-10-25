import scale from './var';
import SVG from '../svg';

let samplemessages = []

export default function renderChatHeader({ ctx, w, h }, { getSColor }) {
    let bgColor = getSColor("BACKGROUND_MOBILE_SECONDARY");
    let buttonsColor = getSColor("INTERACTIVE_NORMAL");
    let separatorColor = getSColor("BACKGROUND_TERTIARY");
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.shadowColor = separatorColor;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = scale(1);
    ctx.fillRect(0, 0, ...scale(720, 104));
    ctx.restore();

    ctx.fillStyle = buttonsColor;
    ctx.fillRect(...scale(36, 40, 35, 4));

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
    } else {
        ctx.translate(462 * size, 30 * size);
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