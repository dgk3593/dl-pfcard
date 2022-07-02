import { useState } from "react";
import { useDebounce } from "@/useDebounce";
import { bgMap } from "./bgList";
import { useAppState } from "@/state";

import "./BackgroundSettings.css";
import Searchbox from "../Searchbox";

const getBgPath = bg => `url(bg-preview/${bg}.png)`;

const BgPreview = ({ bg, ...props }) => (
    <div
        data-value={bg}
        data-name={bgMap[bg]}
        className="bg-preview"
        style={{ backgroundImage: getBgPath(bg) }}
        {...props}
    />
);

export default function BackgroundSettings() {
    const { background, setBackground } = useAppState();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const bgCount = Object.keys(bgMap).length;
    const bgList = Array(bgCount)
        .fill(0)
        .map((_, i) => `${i + 1}`.padStart(3, "0"));

    const filteredList = debouncedQuery
        ? bgList.filter(bg =>
              bgMap[bg].toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        : bgList;

    const handleClick = event => {
        const { value } = event.currentTarget.dataset;
        setBackground(value);
    };

    return (
        <div className="background-settings">
            <Searchbox query={query} onChange={setQuery} />
            {filteredList.map(bg => (
                <BgPreview
                    bg={bg}
                    key={bg}
                    onClick={handleClick}
                    data-active={bg === background}
                />
            ))}
        </div>
    );
}
