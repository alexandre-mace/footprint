import './App.css';
import Header from "./component/Header";
import IndividualDataVisualisation from "./component/IndividualDataVisualisation";
import {useEffect, useState} from "react";
import Loader from "./component/Loader";
import actions from "./domain/actions";
import Footer from "./component/Footer";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [mode, setMode] = useState('home');

    useEffect(() => {
        setInterval(() => {setLoaded(true)}, 1000)
    }, [])
    return (
        <div className="App">
            {!loaded &&
            <Loader/>
            }
            <>
                <Header mode={mode} setMode={setMode}/>
                <h1 className={"text-center"}>Footprint</h1>
                <IndividualDataVisualisation actions={actions}/>
                <Footer/>
            </>
        </div>
    );
}

export default App;
