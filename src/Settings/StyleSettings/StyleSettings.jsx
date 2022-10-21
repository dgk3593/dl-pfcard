import { useAppState } from "@/state";
import { styleMap } from "./styleMap";
import "./StyleSettings.css";

const getPreviewPath = style => `url(style-preview/${style}.png)`;
const StylePreview = ({ style, ...props }) => (
    <div
        data-value={style}
        data-name={styleMap[style]}
        className="style-preview"
        style={{ backgroundImage: getPreviewPath(style) }}
        {...props}
    />
);

export default function StyleSettings() {
    const { style: currentStyle, setStyle } = useAppState();
    const styleCount = Object.keys(styleMap).length;
    const styleList = Array(styleCount)
        .fill(0)
        .map((_, i) => `${i + 1}`.padStart(3, "0"));

    const handleClick = event => {
        const { value } = event.currentTarget.dataset;
        setStyle(value);
    };

    return (
        <div className="style-settings">
            {styleList.map(style => (
                <StylePreview
                    style={style}
                    key={style}
                    onClick={handleClick}
                    {...(style === currentStyle && { "data-active": true })}
                />
            ))}
        </div>
    );
}
