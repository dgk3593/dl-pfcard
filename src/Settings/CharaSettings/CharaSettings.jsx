import { useAppState } from "@/state";
import { useState } from "react";
import { idMap, getPartPath, getThumbnailPath, charaList } from "@/helper";
import "./CharaSettings.css";
import Searchbox from "../Searchbox";
import { useDebounce } from "@/useDebounce";

export default function CharaSettings() {
    const [changeMode, setChangeMode] = useState(true);
    const chara = useAppState(state => state.chara);
    const { id, setId, data, setPart } = chara;

    const toggleMode = () => setChangeMode(value => !value);
    const handleClick = ({ currentTarget }) => {
        const { value, part } = currentTarget.dataset;
        setPart(part, value);
    };
    const getParts = part => {
        const list = data[`${part}List`];
        return (
            list?.length &&
            list.map(p => (
                <img
                    key={p}
                    alt={p}
                    data-active={p === chara[part]}
                    data-value={p}
                    data-part={part}
                    src={getPartPath(id, p)}
                    onClick={handleClick}
                />
            ))
        );
    };
    const faceParts = getParts("face");
    const face2Parts = getParts("face2");
    const mouthParts = getParts("mouth");
    const mouth2Parts = getParts("mouth2");

    return (
        <div className="chara-settings">
            <div className="chara-info">
                <div className="chara-current">
                    <img alt={id} src={getThumbnailPath(id)} />
                    <span>{idMap?.[id] ?? id}</span>
                </div>
                <button onClick={toggleMode}>
                    {changeMode ? "Change Expression" : "Change Character"}
                </button>
            </div>

            {changeMode ? (
                <CharaSelect onSelect={setId} />
            ) : (
                <div className="chara-parts">
                    {!faceParts && !mouthParts && <div>No parts found</div>}
                    {faceParts}
                    {face2Parts}
                    {mouthParts}
                    {mouth2Parts}
                </div>
            )}
        </div>
    );
}

function CharaSelect({ onSelect }) {
    const { id: currentId } = useAppState(state => state.chara);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const handleClick = ({ currentTarget }) => {
        const { id } = currentTarget.dataset;
        onSelect(id);
    };

    const filteredList = debouncedQuery
        ? charaList.filter(
              ([id, name]) =>
                  name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                  id.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        : charaList;

    const list = filteredList.map(([id, name]) => (
        <div
            className="chara-choice"
            data-id={id}
            onClick={handleClick}
            data-active={currentId === id}
        >
            <img alt={id} src={getThumbnailPath(id)} />
            <div>{name}</div>
        </div>
    ));

    return (
        <>
            <Searchbox
                query={query}
                onChange={setQuery}
                placeholder="Search by name or id"
            />
            <div className="chara-select">{list}</div>
        </>
    );
}
