const Header = () => (
    <div className={"loader"}>
        <div className="slider-wrapper">
            <div className="slider">
                {Array.from(Array(100).keys()).map((item, key) => (
                    <div key={key} className={"slider-item"}><img height={40} src="https://em-content.zobj.net/thumbs/120/apple/285/foot_1f9b6.png" alt="Emoji pied vu de dessous"/></div>
                ))}
            </div>
        </div>
    </div>

)

export default Header;