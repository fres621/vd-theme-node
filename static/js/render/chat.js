import scale from './var';

/*
let samplemessages = [{
    author: {
        name: "fres",
        avatar: img
    },
    timestamp: "Today at 16:57",
    content: [
        { content: 'normal text ', type: 'text' },
        { content: 'and inline code text', type: 'inlineCode' },
        { content: ' hehe', type: 'text' },
        { content: '!', type: 'text' }
    ]
}]
*/

export default function renderChat({ ctx, w, h }, { getSColor, getBackground, messages }) {
    let BGColor = getSColor("BG_BASE_PRIMARY");
    let textColor = getSColor("TEXT_NORMAL");
    let spoilerColor = getSColor("BACKGROUND_SECONDARY");
    let authorColor = getSColor("INTERACTIVE_ACTIVE");
    let timestampColor = getSColor("TEXT_MUTED");

    // #region Background
    ctx.fillStyle = BGColor;
    ctx.fillRect(0, 0, w, h);
    let bgImage = getBackground()?.image;
    if (bgImage) {
        let [chatWidth, chatHeight] = scale(720, 1360);
        let aspectRatio = bgImage.width / bgImage.height;
        let width = bgImage.width > bgImage.height ? chatWidth : Math.floor(chatHeight * aspectRatio)
        let height = bgImage.width > bgImage.height ? Math.floor(chatWidth * aspectRatio) : chatHeight
        ctx.drawImage(bgImage, (width-chatWidth ? -(width-chatWidth)/2 : 0), scale(106)[0], width, height);
    };
    // #endregion

    messages.map(message => {
        ctx.imageSmoothingQuality = "high";
        ctx.save();
        ctx.beginPath();
        ctx.arc(...scale(22+(75/2), 1218+(75/2), 75/2), 0, Math.PI * 2); 
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(message.author.avatar, ...scale(22, 1218, 75, 75));
        ctx.restore();

        ctx.font = `600 ${scale(30.25)}px gg-sans`;
        ctx.fillStyle = authorColor;
        ctx.fillText(message.author.name, ...scale(120, 1249))
        let textw = ctx.measureText(message.author.name).width;

        ctx.font = `500 ${scale(22)}px gg-sans`;
        ctx.fillStyle = timestampColor;
        ctx.fillText(message.timestamp, textw + scale(120 + 16)[0], scale(1249))

        let [textx, texty] = scale(120, 1289);
        
        for (const node of message.content) {
            if (node.type === "text") {
                ctx.font = `500 ${scale(30)}px gg-sans`;
                ctx.fillStyle = textColor;
                ctx.fillText(node.content, textx, texty);
                textx += ctx.measureText(node.content).width;
            } else if (node.type === "inlineCode") {
                ctx.font = `500 ${scale(25)}px SourceCodePro`;
                let twidth = ctx.measureText(node.content).width;
                ctx.fillStyle = spoilerColor;
                ctx.fillRect(textx, texty-scale(30)[0], twidth, scale(38)[0]);
                ctx.fillStyle = textColor;
                ctx.fillText(node.content, textx, texty);
                textx += ctx.measureText(node.content).width;
            }
        }
        
    })
};