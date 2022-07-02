import { tabDetails } from "./Settings";

export default function TabBar({ tabs, active, onChange }) {
    const handleClick = event => {
        const { value } = event.currentTarget.dataset;
        onChange(value);
    };

    return (
        <nav className="TabBar">
            {tabs.map(tab => (
                <div
                    key={tab}
                    onClick={handleClick}
                    data-value={tab}
                    className={active === tab ? "active" : ""}
                >
                    {tabDetails[tab].label}
                </div>
            ))}
        </nav>
    );
}
