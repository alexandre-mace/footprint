import React from 'react';
import CustomSlider from "./CustomSlider";

const ActionSliders = ({ actions, handleActionValueChange }) => {
    return (
        <>
            <div className="input-sliders-wrapper">
                {actions.map((actionCategory, key) => (
                    <div key={key} style={{marginBottom: '0.5rem'}}>
                        <div className={"d-flex"} style={{marginBottom: '1rem'}}>
                            <img height={40} src={actionCategory.img} alt=""/>
                            <div className={"category-label"} style={{marginLeft: '15px'}}>{actionCategory.label}</div>
                        </div>
                        <div className="d-flex flex-wrap">
                            {actionCategory.actions.map((action, actionKey) => (
                                <div style={{marginRight: '1.5rem'}} key={actionKey}>
                                    <CustomSlider action={action} handleActionValueChange={handleActionValueChange}/>
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