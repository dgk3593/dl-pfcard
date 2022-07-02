export default function Searchbox({
    query,
    onChange,
    placeholder = "Search by name",
}) {
    const handleChange = event => {
        const { value } = event.target;
        onChange(value);
    };

    const resetQuery = () => onChange("");

    return (
        <div className="searchbox">
            <input
                type="text"
                className="SearchBox"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <button onClick={resetQuery}>✖</button>
        </div>
    );
}
