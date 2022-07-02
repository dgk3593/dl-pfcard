import { useState } from "react";
import TabBar from "./TabBar";
import BackgroundSettings from "./BackgroundSettings";
import CharaSettings from "./CharaSettings";
import StyleSettings from "./StyleSettings";
import TextSettings from "./TextSettings";

import "./Settings.css";

export const tabDetails = {
    bg: { label: "Background", component: BackgroundSettings },
    chara: { label: "Character", component: CharaSettings },
    style: { label: "Style", component: StyleSettings },
    text: { label: "Text", component: TextSettings },
};
export const tabs = ["bg", "chara", "style", "text"];

export default function Settings() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const onChange = tab => setActiveTab(tab);

    const Component = tabDetails[activeTab].component;

    return (
        <div className="settings">
            <TabBar tabs={tabs} onChange={onChange} active={activeTab} />
            <Component />
        </div>
    );
}
