import { SRC_URL, FACE_LEFT, FACE_TOP, PORTRAIT_SIZE } from "@/const";

export async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
        throw new Error(await response.text());
    } catch (e) {
        console.error(e);
    }
}

/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

/**
 * @typedef {object} SpriteData
 * @property {{ base: string, offsetX: number, offsetY: number, sizeX: number, sizeY:number }} base
 * @property {string[]} faceList
 * @property {string[]} mouthList
 * @property {{ x: number, y: number }} size
 * @property {{ x: number, y: number }} offset
 * @property {{ x: number, y: number }} partOffset
 * @property {{ x: number, y: number }} faceCenter
 */
/**
 * @param {string} id
 * @return {Promise<SpriteData>}
 */
export const fetchData = async id => {
    const datapath = `${SRC_URL}/${id}/index.json`;
    const data = await fetchJson(datapath);
    if (data.fromWeb) {
        data.base = {
            path: `${SRC_URL}/${id}/${id}_base.png`,
            offsetX: 0,
            offsetY: 0,
            sizeX: 900,
            sizeY: 500,
        };
        return data;
    }
    // 2 faces
    if (data.offset.x2) {
        const centerX =
            (data.offset.x + data.offset.x2) / 2 +
            (data.size.x + data.size.x2) / 4;
        const centerY =
            (data.offset.y + data.offset.y2) / 2 +
            (data.size.y + data.size.y2) / 4;

        data.base = {
            path: `${SRC_URL}/${id}/${id}_base.png`,
            offsetX: centerX - FACE_LEFT,
            offsetY: centerY - FACE_TOP,
            sizeX: PORTRAIT_SIZE + FACE_LEFT - centerX,
            sizeY: 500,
        };
        data.partsOffset = {
            x: data.offset.x - data.base.offsetX,
            y: data.offset.y - data.base.offsetY,
            x2: data.offset.x2 - data.base.offsetX,
            y2: data.offset.y2 - data.base.offsetY,
        };
        return data;
    }

    data.base = {
        path: `${SRC_URL}/${id}/${id}_base.png`,
        offsetX: data.offset.x + data.size.x / 2 - FACE_LEFT,
        offsetY: data.offset.y + data.size.y / 2 - FACE_TOP,
        sizeX: PORTRAIT_SIZE + FACE_LEFT - data.offset.x - data.size.x,
        sizeY: 500,
    };
    data.partsOffset = {
        x: FACE_LEFT - data.size.x / 2,
        y: FACE_TOP - data.size.y / 2,
    };
    return data;
};

/**
 * @param {string} id
 * @param {string} part
 * @return {string}
 */
export const getPartPath = (id, part) =>
    `${SRC_URL}/${id}/${id}_parts_c${part}.png`;

/**
 * @param {string} id
 * @return {string}
 */
export const getThumbnailPath = id => `${SRC_URL}/${id}/${id}_thumbnail.png`;

/**
 * @param {string} id
 * @param {string} part
 */
export const loadPartImage = async (id, part) => {
    const imgPath = getPartPath(id, part);
    const image = await loadImage(imgPath);
    return image;
};

let idMap, charaList;
fetchJson(`${SRC_URL}/index.json`).then(data => {
    idMap = data;
    charaList = Object.entries(data);
});
export { idMap, charaList };
