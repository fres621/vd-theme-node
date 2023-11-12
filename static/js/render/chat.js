/* eslint-disable no-unused-vars */
import scale, { s, scaledCtx } from "./var";

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

function calculateEmbedHeight(embed) {
    let height = 257;
    if (embed.image?.image) {
        var ratio = Math.min(517 / embed.image.image.width, 400 / embed.image.image.height);
        height += embed.image.image.height * ratio;
        height += -110;
    }
    return height;
}

function trimTextToWidth(ctx, text, addEllipsis, maxWidth) {
    const measure = ctx.measureText;

    if (measure(text).width <= maxWidth) return text;
    if (!text.length) return "";

    for (let i = text.length - 1; i > 0; i--) {
        let trimmed = text.substring(0, i) + (addEllipsis ? "..." : "");
        if (measure(trimmed).width <= maxWidth) return trimmed;
    }
    return "";
}

export default function renderChat({ ctx, w, h }, { getSColor, getBackground, messages }) {
    let BGColor = getSColor("BG_BASE_PRIMARY");
    let textColor = getSColor("TEXT_NORMAL");
    let spoilerColor = getSColor("BACKGROUND_SECONDARY");
    let authorColor = getSColor("INTERACTIVE_ACTIVE");
    let timestampColor = getSColor("TEXT_MUTED");
    let replyLineColor = getSColor("BACKGROUND_ACCENT");
    let replyContentColor = getSColor("ICON_SECONDARY");

    const scaled = scaledCtx(ctx);

    // #region Background
    ctx.fillStyle = BGColor;
    ctx.fillRect(0, 0, w, h);
    let bg = getBackground();
    let bgImage = bg?.image;
    if (bgImage) {
        ctx.save();
        let [chatWidth, chatHeight] = [720, 1360];
        var ratio = Math.max(chatWidth / bgImage.width, chatHeight / bgImage.height);
        var [width, height] = [bgImage.width * ratio, bgImage.height * ratio];
        // RN blurRadius to pixel = blurRadius * (screenDPI / 160) / 2 | my screen dpi is 384 so I'll multiply blur radius by 384 / 160
        if (bg.blur) ctx.filter = `blur(${bg.blur * 2.4}px)`;
        scaled.drawImage(bgImage, -(width - chatWidth) / 2, 106 - (height - chatHeight) / 2, width, height);
        ctx.restore();
    }
    // #endregion

    ctx.save();
    [...messages].reverse().map((message) => {
        let [textx, texty] = [120, 1289];

        let visitors = {
            text: {
                measure: (node) => {
                    scaled.setFont("500 30px gg-sans");
                    return scaled.measureText(node.content).width;
                },
                render: (node) => {
                    scaled.setFont("500 30px gg-sans");
                    ctx.fillStyle = textColor;
                    ctx.fillText(node.content, textx, texty);
                    textx += scaled.measureText(node.content).width;
                },
            },
            inlineCode: {
                measure: (node) => {
                    scaled.setFont("500 25px SourceCodePro");
                    return scaled.measureText(node.content).width;
                },
                render: (node) => {
                    scaled.setFont("500 25px SourceCodePro");
                    let twidth = scaled.measureText(node.content).width;
                    ctx.fillStyle = spoilerColor;
                    scaled.fillRect(textx, texty - 30, twidth, 38);
                    ctx.fillStyle = textColor;
                    scaled.fillText(node.content, textx, texty);
                    textx += scaled.measureText(node.content).width;
                },
            },
            link: {
                measure: (node) => {
                    return node.content.map((node) => visitors[node.type].measure(node)).reduce((p, a) => p + a, 0);
                },
                render: (node) => {
                    let backup = textColor;
                    textColor = getSColor("TEXT_LINK");
                    node.content.map((node) => visitors[node.type].render(node));
                    textColor = backup;
                },
            },
        };

        let lines = Math.floor(message.content.map((node) => visitors[node.type].measure(node)).reduce((p, a) => p + a, 0) / 690);

        scaled.translate(0, -lines * 43);

        if (message.embeds?.length) console.log(message.embeds.map((embed) => calculateEmbedHeight(embed)));
        if (message.embeds?.length) scaled.translate(0, -message.embeds.map((embed) => calculateEmbedHeight(embed)).reduce((p, a) => p + a, 0));

        let height = 0;
        if (message.author?.avatarUrl) {
            height += 70;
            ctx.save();
            ctx.imageSmoothingQuality = "high";
            ctx.beginPath();
            scaled.arc(22 + 75 / 2, 1218 + 75 / 2, 75 / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            scaled.drawImage(message.author.avatar, 22, 1218, 75, 75);
            ctx.restore();

            scaled.setFont("600 30.25px gg-sans");
            ctx.fillStyle = message.colorString || authorColor;
            scaled.fillText(message.author.name, 120, 1249);
            let textw = ctx.measureText(message.author.name).width;
            scaled.setFont("500 22px gg-sans");
            ctx.fillStyle = timestampColor;
            scaled.fillText(message.timestamp, textw + 120 + 16, 1249);
        }

        height += 48;
        if (message.referencedMessage) {
            height += 46;
            ctx.save();
            // Reply arrow thing
            ctx.fillStyle = replyLineColor;
            ctx.strokeStyle = replyLineColor;
            scaled.fillRect(58, 1193, 4, 17);
            scaled.fillRect(66, 1185, 46, 4);
            ctx.beginPath();
            scaled.arc(66, 1193, 6, (Math.PI / 2) * 2, (Math.PI / 2) * 3);
            scaled.setLineWidth(4);
            ctx.stroke();

            // PFP in reply
            ctx.imageSmoothingQuality = "high";
            ctx.beginPath();
            scaled.arc(120 + 30 / 2, 1172 + 30 / 2, 30 / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            scaled.drawImage(message.referencedMessage.author.avatar, 120, 1172, 30, 30);
            ctx.restore();

            // Name in reply
            ctx.fillStyle = message.colorString || authorColor;
            scaled.fillText(message.referencedMessage.author.name, 158, 1195);
            let twidth = scaled.measureText(message.referencedMessage.author.name).width;
            let textx = twidth;

            ctx.fillStyle = replyContentColor;
            scaled.setFont("500 22px gg-sans");
            for (const node of message.referencedMessage.content) {
                scaled.fillText(node.content, textx + 167, 1195);
            }
        }

        function split(node, x = 120, y = 577) {
            let f = (node) => (textx - x + visitors[node.type].measure(node)) / y;
            if (f(node) <= 1) return [node];
            if (typeof node.content === "string") {
                if (f({ ...node, content: node.content[0] }) > 1) return [{ ...node, content: " " }, node];
                let firstnode = { ...node };
                let i = 0;
                while (f(firstnode) > 1) {
                    i++;
                    firstnode.content = firstnode.content.slice(0, -1);
                }
                let secondnode = { ...node, content: node.content.slice(-i) };
                return [firstnode, ...split(secondnode)];
            }
        }

        for (const node of message.content) {
            split(node).forEach((node) => {
                if (textx >= 690) {
                    textx = 120;
                    texty += 42;
                }
                visitors[node.type].render(node);
            });
            /*
            console.log({ textx, texty });
            console.log(node, visitors[node.type].measure(node));
            console.log((textx - 120 + visitors[node.type].measure(node)) / 577);
            split(node);
            if (visitors[node.type]) visitors[node.type].render(node);
            */
        }

        if (message.embeds?.length)
            for (const embed of message.embeds) {
                texty += 24;
                ctx.beginPath();
                scaled.roundRect(120, texty, 577, 340, 30);
                ctx.fillStyle = embed.backgroundColor ?? getSColor("BACKGROUND_SECONDARY");
                ctx.fill();
                ctx.save();
                ctx.clip();
                ctx.fillStyle = embed.borderLeftColor ?? getSColor("BACKGROUND_TERTIARY");
                scaled.fillRect(120, texty, 8, 340);
                ctx.restore();
                textx = 150;
                texty += 46;
                let xlimit = embed.thumbnail?.image ? 400 : 690;
                for (const node of embed.title) {
                    split(node, 120, xlimit).forEach((node) => {
                        if (textx >= xlimit) {
                            textx = 120;
                            texty += 42;
                        }
                        visitors[node.type].render(node);
                    });
                }

                if (embed.image?.image) {
                    var ratio = Math.min(517 / embed.image.image.width, 400 / embed.image.image.height);
                    scaled.drawImage(embed.image.image, 150, texty + 74, embed.image.image.width * ratio, embed.image.image.height * ratio);
                }
            }

        ctx.translate(0, -height);
    });

    ctx.restore();
}
