import Card from "./Card";
import html2canvas from "html2canvas";

import { CANVAS_WIDTH } from "@/const";

function downloadURL(url, fileName) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default function Output() {
    const handleClick = async () => {
        const ele = document.querySelector(".card");
        const { width } = ele.getBoundingClientRect();
        const scale = CANVAS_WIDTH / width;
        const canvas = await html2canvas(ele, { scale });
        const url = canvas.toDataURL("image/png");
        downloadURL(url, "card.png");
    };

    return (
        <div className="output">
            <Card />
            <button type="button" className="download" onClick={handleClick}>
                Download
            </button>
        </div>
    );
}
