import scale from './var';

let samplemessages = []

export default function renderChat({ ctx, w, h }, { getSColor, getBackground }) {
    let BGColor = getSColor("BG_BASE_PRIMARY");
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
};