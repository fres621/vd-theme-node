let assets = {};

async function resolveAsset(uri) {
    return new Promise(res=>{
        image = new Image();
        image.src = uri;
        image.onload = function () {
            res(image);
        }
        image.onerror = function () {
            res();
        }
    });
};

export async function addAsset(uri) {
    let image = await resolveAsset(uri);
    if (image) assets[uri] = image;
}

export async function getAssets() {
    return assets;
}


// Unused as of now, will be used in the future to replace loadImage in render/canvas.js