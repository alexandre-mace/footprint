import HomeDemo from "./charts/HomeDemo";

const Home = ({setMode}) => (
    <div className={"home"}>
        <div className={"home-text-content"}>
            <h1 className={"app-title-big"}>Footprint</h1>
            <div className={"app-subtitle"}>Because reducing human pressure on the planet is a combination of <span onClick={() => setMode('individual')} className={"important-word"}>individual</span> and <span onClick={() => setMode('collective')} className={"important-word"}>collective</span> actions, here are some hints - thanks to data - about what to do by yourself and together.</div>
            {/*<HomeDemo/>*/}
        </div>
        <div className={"mode-cta-wrapper d-flex justify-content-evenly flex-wrap"}>
            <div onClick={() => setMode('individual')} className={"mode-cta d-flex align-items-center mt-3"}>
                Discover individual data <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/foot_1f9b6.png" alt=""/>
            </div>
            <div onClick={() => setMode('collective')} className={"mode-cta d-flex align-items-center mt-3"}>
                Discover collective data <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/foot_1f9b6.png" alt=""/><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/foot_1f9b6.png" alt=""/><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/foot_1f9b6.png" alt=""/>
            </div>
        </div>
    </div>
)

export default Home;