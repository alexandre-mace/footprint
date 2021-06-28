import React, {useState} from 'react';
import CustomSlider from "./CustomSlider";

const ActionSliders = ({ actions, handleActionValueChange, resetValues }) => {
    const [activeActions, setActiveActions] = useState([]);

    const handleActionValueChangeProxy = (action, newValue) => {
        setActiveActions(Array.from(new Set([...activeActions, action])));
        handleActionValueChange(action, newValue)
    }

    return (
        <>
            <div className="input-sliders-wrapper">
                <button className={"reset"} onClick={() => {resetValues();setActiveActions([])}}>Réinitialiser</button>
                {actions.map((actionCategory, key) => (
                    <div key={key} style={{marginBottom: '0.5rem'}}>
                        <div className={"d-flex"} style={{marginBottom: '1rem'}}>
                            <img className={"category-img"} src={actionCategory.img} alt=""/>
                            <div className={"category-label"} style={{marginLeft: '15px'}}>{actionCategory.label}</div>
                        </div>
                        <div className="d-flex flex-wrap">
                            {actionCategory.actions.map((action, actionKey) => (
                                <div style={{marginRight: '1.5rem'}} key={actionKey}>
                                    <CustomSlider isActive={activeActions.includes(action)} action={action} handleActionValueChange={handleActionValueChangeProxy}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ActionSliders;