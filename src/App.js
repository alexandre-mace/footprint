import './App.css';
import Header from "./component/Header";
import DataVisualisation from "./component/DataVisualisation";
import {useEffect, useState} from "react";
import Loader from "./component/Loader";
import actions from "./domain/actions";


function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      setInterval(() => {setLoaded(true)}, 1000)
  }, [])
  return (
    <div className="App">
        {!loaded &&
            <Loader/>
        }
        <>
            <Header/>
            <DataVisualisation actions={actions}/>
        </>
    </div>
  );
}

export default App;
