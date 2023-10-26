import scale from './var';

export default function renderChatInputBar({ ctx, w, h }, { getSColor }) {
    let BGColor = getSColor("BG_BASE_PRIMARY");
    let separatorColor = getSColor("INPUT_BACKGROUND");
    let ButtonBGColor = getSColor("REDESIGN_BUTTON_SECONDARY_ALT_BACKGROUND");
    let inputBGColor = getSColor("REDESIGN_CHAT_INPUT_BACKGROUND");
    let EmojiPickerBtnColor = getSColor("INTERACTIVE_NORMAL");
    let ButtonColor = getSColor("REDESIGN_BUTTON_SECONDARY_ALT_TEXT");
    let placeholderColor = getSColor("TEXT_MUTED");
    let textColor = "#ffffff";
    
    // #region Background
    ctx.save();
    ctx.shadowColor = separatorColor;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = scale(-1.5);

    ctx.fillStyle = BGColor;
    ctx.fillRect(0, scale(1359)[0], w, h - scale(1360));
    ctx.restore();
    // #endregion

    ctx.save();
    // #region Background for input
    ctx.fillStyle = inputBGColor;
    ctx.beginPath()
    ctx.roundRect(...scale(105, 1372.5, 510 , 75.6, 40));
    ctx.fill();
    // #endregion

    // #region Background for buttons
    ctx.fillStyle = ButtonBGColor;
    ctx.beginPath();
    ctx.arc(...scale(53.5, 1410.5 , 37.4), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(...scale(668.5, 1410.5, 37.4), 0, 2 * Math.PI);
    ctx.fill();
    // #endregion

    ctx.font = `${scale(30)}px gg-sans`;
    ctx.fillStyle = placeholderColor;
    let chattext = "Message @uwu";
    ctx.fillText(chattext, ...scale(131, 1422));

    ctx.fillStyle = ButtonColor;
    // Attachment plus
    ctx.fillRect(...scale(40, 1409, 27, 3));
    ctx.fillRect(...scale(52, 1397, 3, 27));

    // Voice note mic
    ctx.beginPath();
    ctx.arc(...scale(668.5, 1410.6, 11), 0, 1 * Math.PI);
    ctx.lineWidth = scale(3.5)[0];
    ctx.strokeStyle = ButtonColor;
    ctx.stroke();
    ctx.fillRect(...scale(666.5, 1420, 4, 9));
    ctx.beginPath();
    ctx.roundRect(...scale(663, 1394, 11, 23, 100));
    ctx.fill();

    // Emoji picker icon
    ctx.fillStyle = EmojiPickerBtnColor;
    ctx.beginPath();
    ctx.arc(...scale(576.5, 1410.5, 19), 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = inputBGColor;
    ctx.beginPath();
    ctx.arc(...scale(569, 1403, 3.6), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(...scale(584, 1403, 3.6), 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(...scale(576.5, 1412.5, 11), 0, 1 * Math.PI);
    ctx.fill();
    ctx.restore();
};