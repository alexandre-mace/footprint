const Header = () => (
    <div className={"loader"}>
        <div className="slider-wrapper">
            <div className="slider">
                {Array.from(Array(100).keys()).map((item, key) => (
                    <div key={key} className={"slider-item"}>:)</div>
                ))}
            </div>
        </div>
    </div>

)

export default Header;