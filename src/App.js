import './App.css';
import Header from "./component/Header";
import IndividualDataVisualisation from "./component/IndividualDataVisualisation";
import {useEffect, useState} from "react";
import Loader from "./component/Loader";
import actions from "./domain/actions";
import Home from "./component/Home";
import Footer from "./component/Footer";
import CollectiveDataVisualisation from "./component/CollectiveDataVisualisation";

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
                {/*{mode === 'home' &&*/}
                {/*<Home setMode={setMode}/>*/}
                {/*}*/}
                {/*{mode === 'individual' &&*/}
                <IndividualDataVisualisation actions={actions}/>
                {/*}*/}
                {/*{mode === 'collective' &&*/}
                {/*<CollectiveDataVisualisation/>*/}
                {/*}*/}
                <Footer/>
            </>
        </div>
    );
}

export default App;
