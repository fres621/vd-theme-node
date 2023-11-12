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

// TODO fix calculating embed height

// The X at which a text line starts in a message content
const messageContentStartX = 120;

const messageContentWidth = 575;

// The X at which a text line starts in an embed
const embedContentStartX = 150;

// The width of the area in an embed where text can be
const embedContentWidth = 519;

const emptyNode = { type: "text", content: "" };

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

// chatgpt
function androidColorToHex(androidColor) {
    if (!androidColor) return null;
    return "#" + (androidColor + 0x1000000).toString(16);
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

        let textFont = "500 30px gg-sans";
        let visitors = {
            text: {
                measure: (node) => {
                    scaled.setFont(textFont);
                    return scaled.measureText(node.content).width;
                },
                render: (node) => {
                    scaled.setFont(textFont);
                    ctx.fillStyle = textColor;
                    scaled.fillText(node.content, textx, texty);
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

        let lines = Math.floor(message.content.map((node) => visitors[node.type].measure(node)).reduce((p, a) => p + a, 0) / messageContentWidth);

        scaled.translate(0, -lines * 42);

        if (message.embeds?.length) scaled.translate(0, -message.embeds.map((embed) => calculateEmbedHeight(embed) + 16).reduce((p, a) => p + a, 0));

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
            let textw = scaled.measureText(message.author.name).width;
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

        function splitAST(node, maxX) {
            // Returns the node width / maxX, if it's above 1 it should be split
            let getOverflow = (node) => (textx + visitors[node.type].measure(node)) / maxX;
            if (getOverflow(node) <= 1) return [node];

            function splitAt(node, n) {
                let content = node.content;
                switch (node.type) {
                    case "text":
                    case "inlineCode":
                        return (() => {
                            if (!n)
                                return {
                                    sub: node,
                                    rest: emptyNode,
                                };
                            let splitIndex = content.lastIndexOf(" ", content.length - n);
                            return {
                                sub: { ...node, content: content.slice(0, splitIndex === -1 ? -n : splitIndex) },
                                rest: { ...node, content: content.slice(splitIndex === -1 ? -n : splitIndex + 1) },
                            };
                        })();
                    case "link":
                        return (() => {
                            function whereToSplitLinkContent(link) {
                                for (let i = 0; i < link.content.length; i++) {
                                    let length = getOverflow({ ...link, content: link.content.slice(0, i + 1) });
                                    if (length > 1) return i;
                                }
                                return -1;
                            }

                            // the whole link fits in 1 line.
                            if (whereToSplitLinkContent(node) === -1)
                                return {
                                    sub: node,
                                    rest: emptyNode,
                                };
                            let index = whereToSplitLinkContent(node);
                            let partToSub = node.content.slice(0, index + 1);
                            let nodeToSub = partToSub[partToSub.length - 1];
                            partToSub[partToSub.length - 1] = splitAt(nodeToSub, n).sub;
                            let rest = [splitAt(nodeToSub, n).rest, ...node.content.slice(index + 1)];
                            return {
                                sub: { ...node, content: partToSub },
                                rest: { ...node, content: rest },
                            };
                        })();
                }
            }

            let i = 0;
            while (getOverflow(splitAt(node, i).sub) > 1) {
                i++;
            }

            const { sub, rest } = splitAt(node, i);
            return [sub, rest];
        }

        function renderLine(node, startX, maxX, leading = 46) {
            let [sub, rest] = splitAST(node, maxX);
            visitors[sub.type].render(sub);
            if (rest) {
                textx = startX;
                texty += leading;
                renderLine(rest, startX, maxX, leading);
            }
        }

        for (const node of message.content) {
            renderLine(node, messageContentStartX, messageContentStartX + messageContentWidth, 42);
        }

        function calculateEmbedHeight(embed) {
            let height = 64;
            let stextfont = textFont;
            if (embed.title?.length) {
                textFont = "600 30px gg-sans";
                let lines = Math.ceil(embed.title.map((node) => visitors[node.type].measure(node)).reduce((p, a) => p + a, 0) / embedContentWidth);
                height += lines * 42;
            }
            if (embed.description?.length) {
                textFont = "500 25.7px gg-sans";
                let lines = Math.ceil(embed.description.map((node) => visitors[node.type].measure(node)).reduce((p, a) => p + a, 0) / embedContentWidth);
                height += lines * 44;
            }
            if (embed.image?.image) {
                var ratio = Math.min(517 / embed.image.image.width, 400 / embed.image.image.height);
                height += embed.image.image.height * ratio + 2;
            }
            textFont = stextfont;
            return height;
        }

        if (message.embeds?.length)
            for (const embed of message.embeds) {
                texty += 24;
                ctx.beginPath();
                scaled.roundRect(120, texty, 577, calculateEmbedHeight(embed), 30);
                ctx.fillStyle = embed.backgroundColor ?? getSColor("BACKGROUND_SECONDARY");
                ctx.fill();
                ctx.save();
                ctx.clip();
                ctx.fillStyle = androidColorToHex(embed.borderLeftColor) ?? getSColor("BACKGROUND_TERTIARY");
                scaled.fillRect(120, texty, 8, calculateEmbedHeight(embed));
                ctx.restore();
                textx = 150;
                texty += 46;

                // temporary
                texty += 24 + 16;

                let stextfont = textFont;
                textFont = "600 30px gg-sans";
                //let xlimit = embed.thumbnail?.image ? 400 : 690;
                for (const node of embed.title) {
                    renderLine(node, embedContentStartX, embedContentStartX + embedContentWidth, 40);
                }
                textFont = stextfont;

                textx = 150;
                texty += 48;

                textFont = "500 25.7px gg-sans";
                for (const node of embed.description) {
                    renderLine(node, embedContentStartX, embedContentStartX + embedContentWidth, 35);
                }
                textFont = stextfont;

                if (embed.image?.image) {
                    var ratio = Math.min(517 / embed.image.image.width, 400 / embed.image.image.height);
                    ctx.beginPath();
                    scaled.roundRect(150, texty + 23, embed.image.image.width * ratio, embed.image.image.height * ratio, 30);
                    ctx.save();
                    ctx.clip();
                    scaled.drawImage(embed.image.image, 150, texty + 23, embed.image.image.width * ratio, embed.image.image.height * ratio);
                    ctx.restore();
                }
            }

        scaled.translate(0, -height);
    });

    ctx.restore();
}
