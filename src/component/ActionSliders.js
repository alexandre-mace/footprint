import React, {useState} from 'react';
import CustomSlider from "./CustomSlider";
import ActionsDisplayManager from "./ActionsDisplayManager";

const ActionSliders = ({ actions, handleActionValueChange, resetValues }) => {
    const [activeActions, setActiveActions] = useState([]);
    const [visibleActions, setVisibleActions] = useState(actions.map(actionCategory => actionCategory.actions).flat().filter(action => action.visible));

    const handleActionValueChangeProxy = (action, newValue) => {
        setActiveActions(Array.from(new Set([...activeActions, action])));
        handleActionValueChange(action, newValue)
    }

    const handleReset = () => {
        resetValues();
        setActiveActions([])
    }

    const toggleFromVisibleActions = (action) => {
        if (visibleActions.includes(action)) {
            setVisibleActions(visibleActions.filter(visibleAction => visibleAction !== action))
        } else {
            setVisibleActions([...visibleActions, action])
        }
    }

    return (
        <>
            <div className="input-sliders-wrapper">
                <ActionsDisplayManager
                    handleReset={handleReset}
                    actions={actions}
                    visibleActions={visibleActions}
                    toggleFromVisibleActions={toggleFromVisibleActions}
                />
                <div className="d-flex justify-content-center flex-wrap actions-sliders-wrapper mx-auto" style={{ marginTop: '1rem'}}>
                    {actions.map((actionCategory, key) => (
                        <div key={key} className={"slider-category-wrapper"} style={{marginBottom: '0.5rem'}}>
                            <div className={"d-flex align-items-center justify-content-center"} style={{marginBottom: '1rem'}}>
                                <img className={"category-img"} src={actionCategory.img} alt=""/>
                                <div className={"category-label"} style={{marginLeft: '15px'}}>{actionCategory.label}</div>
                            </div>
                            <div className="d-flex flex-wrap">
                                {actionCategory.actions.filter(action => visibleActions.includes(action)).map((action, actionKey) => (
                                    <React.Fragment key={actionKey}>
                                        <CustomSlider isActive={activeActions.includes(action)} action={action} handleActionValueChange={handleActionValueChangeProxy}/>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ActionSliders;