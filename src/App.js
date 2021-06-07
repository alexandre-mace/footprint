import './App.css';
import Header from "./component/Header";
import DataVisualisation from "./component/DataVisualisation";
import {useEffect, useState} from "react";
import Loader from "./component/Loader";

const actions = [
    {
        'label': 'Arrêter de manger de la viande',
        'value': 40,
        'color': 'rgb(255,103,0)'
    },
    {
        'label': 'Se déplacer à cheval',
        'value': 30,
        'color': 'rgb(128,0,255, 1)'
    },
    {
        'label': 'Pipi sous la douche',
        'value': 2,
        'color': 'rgb(255,250,0)'
    }
]

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
