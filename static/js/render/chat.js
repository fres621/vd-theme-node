import scale from './var';

let samplemessages = []

export default function renderChat({ ctx, w, h }, { getSColor, getBackground }) {
    let BGColor = getSColor("BG_BASE_PRIMARY");
    // #region Background
    ctx.fillStyle = BGColor;
    ctx.fillRect(0, 0, w, h);
    let bgImage = getBackground()?.image;
    if (bgImage) {
        let aspectRatio = bgImage.width / bgImage.height;
        let width = bgImage.width > bgImage.height ? 360 : Math.floor(680 * aspectRatio)
        let height = bgImage.width > bgImage.height ? Math.floor(360 * aspectRatio) : 680
        ctx.drawImage(bgImage, width-360 ? -(width-360)/2 : 0, 53, width, height);
    };
    // #endregion
};