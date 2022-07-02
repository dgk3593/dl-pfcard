import { useAppState } from "@/state";
import { Fragment } from "react";
import "./TextSettings.css";

const infoFields = [
    { label: "Name", value: "name" },
    { label: "Player Level", value: "level" },
    { label: "Player ID", value: "id" },
    { label: "Alliance Goal", value: "goal" },
];

export default function TextSettings() {
    const { text, setText } = useAppState();
    const handleChange = event => {
        const { value } = event.target;
        const { field } = event.target.dataset;
        setText(field, value);
    };

    return (
        <div className="text-settings">
            <div className="info">
                {infoFields.map(({ label, value }) => (
                    <Fragment key={value}>
                        <label htmlFor={value}>{label}</label>
                        <input
                            value={text[value]}
                            id={value}
                            data-field={value}
                            onChange={handleChange}
                        />
                    </Fragment>
                ))}
            </div>
            <div className="comment">
                <input
                    value={text.comment}
                    data-field="comment"
                    onChange={handleChange}
                    placeholder="Comment"
                />
            </div>
        </div>
    );
}
