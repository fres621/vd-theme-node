var hitRegions = [];

export function getHits(x, y) {
    return hitRegions.filter(({ region }) => x >= region.x && y >= region.y && x <= region.x + region.width && y <= region.y + region.height);
}

export function add(data) {
    hitRegions.push(data);
}

export function clear() {
    hitRegions = [];
}
