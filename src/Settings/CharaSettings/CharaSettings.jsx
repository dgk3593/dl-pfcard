import { useAppState } from "@/state";
import { useState } from "react";
import { idMap, getPartPath, getThumbnailPath, charaList } from "@/helper";
import "./CharaSettings.css";
import Searchbox from "../Searchbox";
import { useDebounce } from "@/useDebounce";

export default function CharaSettings() {
    const [changeMode, setChangeMode] = useState(true);
    const { id, setId, face, mouth, data, setPart } = useAppState(
        state => state.chara
    );
    const { faceList, mouthList } = data;

    const toggleMode = () => setChangeMode(value => !value);
    const handleClick = ({ currentTarget }) => {
        const { value, part } = currentTarget.dataset;
        setPart(part, value);
    };
    const faceParts =
        faceList?.length &&
        faceList.map(f => (
            <img
                key={f}
                alt={f}
                data-active={f === face}
                data-value={f}
                data-part="face"
                src={getPartPath(id, f)}
                onClick={handleClick}
            />
        ));

    const mouthParts =
        mouthList?.length &&
        mouthList.map(m => (
            <img
                key={m}
                alt={m}
                data-active={m === mouth}
                data-value={m}
                data-part="mouth"
                src={getPartPath(id, m)}
                onClick={handleClick}
            />
        ));

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
                    {faceParts}
                    {mouthParts}
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
            <Searchbox query={query} onChange={setQuery} />
            <div className="chara-select">{list}</div>
        </>
    );
}
