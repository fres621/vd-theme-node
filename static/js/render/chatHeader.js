import scale from './var';

let samplemessages = []

export default function renderChatHeader({ ctx, w, h }, { getSColor }) {
    ctx.save();
    ctx.fillStyle = colors.topbarcolor;
    ctx.shadowColor = colors.separatorlines;
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2*size;
    ctx.fillRect(0, 0, 720*size, 104*size);
    ctx.restore();

    // Buttons on top bar
    ctx.save();
    ctx.fillStyle = colors.interactivebuttons;
    if (channel.type == "DMChannel" || channel.type == "GroupDMChannel") {
        ctx.translate(477*size, 30*size);
        ctx.scale(1.9*size, 1.9*size);
        ctx.fill(new Path2D(SVGs.call));
        ctx.translate(43, 0);
        ctx.fill(new Path2D(SVGs.videocall));
        ctx.translate(44, 0);
        ctx.fill(new Path2D(SVGs.members[0]));
        ctx.fill(new Path2D(SVGs.members[1]));
        ctx.fill(new Path2D(SVGs.members[2]));
    } else {
        ctx.translate(462*size, 30*size);
        ctx.scale(1.9*size, 1.9*size);
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