import scale from "./render/var";

var hitRegions = [];

export function getHits(x, y) {
    console.log(hitRegions, x, y);
    return hitRegions.filter(({ region }) => x >= region.x && y >= region.y && x <= region.x + region.width && y <= region.y + region.height);
}

export function getHitsFromInterval(xInterval, yInterval) {
    const [x, y] = scale(720 * xInterval, 1466 * yInterval);
    return getHits(x, y);
}

export function add(data) {
    hitRegions.push(data);
}

export function clear() {
    hitRegions = [];
}
