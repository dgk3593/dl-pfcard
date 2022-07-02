import { useAppState } from "@/state";
import { useRef, useEffect, useState } from "react";

export default function Text() {
    const { name, level, id, goal, comment } = useAppState(state => state.text);
    const [fontSize, setFontSize] = useState("20px");
    /**
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    const textRef = useRef();
    useEffect(() => {
        const setFont = () => {
            const { width } = textRef.current.getBoundingClientRect();
            setFontSize(`${(width * 20) / 900}px`);
        };
        setFont();
        window.addEventListener("resize", setFont);
        return () => window.removeEventListener("resize", setFont);
    });

    return (
        <div
            className="text"
            style={{ fontSize }}
            ref={el => (textRef.current = el)}
        >
            <div className="text-name">{name}</div>
            <div className="text-level">{level}</div>
            <div className="text-id">{id}</div>
            <div className="text-goal">{goal}</div>
            <div className="text-comment">{comment}</div>
        </div>
    );
}
