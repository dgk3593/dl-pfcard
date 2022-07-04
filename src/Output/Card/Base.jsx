import { useAppState } from "@/state";
import { useRef, useEffect } from "react";
import { loadImage, loadPartImage } from "@/helper";

import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/const";

export default function Base() {
    const { background, chara, style } = useAppState();
    /**
     * @type {React.MutableRefObject <HTMLCanvasElement?>}
     */
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        setTimeout(async () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            await drawBackground(ctx, background);
            await drawChara(ctx, chara);
            drawStyle(ctx, style);
        });
    }, [background, chara, style]);

    return <canvas className="base" ref={el => (canvasRef.current = el)} />;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} path
 */
async function drawImage(ctx, path) {
    const image = await loadImage(path);
    ctx.drawImage(image, 0, 0);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} background
 */
async function drawBackground(ctx, background) {
    const path = `bg/${background}.png`;
    await drawImage(ctx, path);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} chara
 */
async function drawChara(ctx, chara) {
    const { id, data } = chara;
    if (!data?.base?.path) return;

    const { x: partX, y: partY } = data.partsOffset ?? {};
    /**
     * @param {string} partId
     */
    const drawPart = async partId => {
        const image = await loadPartImage(id, partId);
        ctx.drawImage(image, partX, partY);
    };

    const { base } = data;
    const { face, mouth } = chara;
    const baseImage = await loadImage(base.path);
    ctx.drawImage(
        baseImage,
        base.offsetX,
        base.offsetY,
        base.sizeX,
        base.sizeY,
        0,
        0,
        base.sizeX,
        base.sizeY
    );

    face && (await drawPart(face));
    mouth && drawPart(mouth);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} style
 */
async function drawStyle(ctx, style) {
    const path = `style/${style}.png`;
    drawImage(ctx, path);
}
