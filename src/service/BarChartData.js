const updateBarChartData = (data, actions) => {
    let alreadyAddedLabels = data.datasets.map((dataset) => dataset.label[0])

    if (alreadyAddedLabels.length !== actions.length && actions.length > alreadyAddedLabels.length) {
        const actionsToAdd = actions.filter((action) => {
            return !alreadyAddedLabels.includes(action.label)
        })

        actionsToAdd.forEach((action) => {
            alreadyAddedLabels.push(action.label)
            data.datasets.push({
                barPercentage: 0.5,
                barThickness: 30,
                label: [action.label],
                backgroundColor: [action.color],
                borderColor: [action.color],
                borderWidth: 1,
                hoverBackgroundColor: [action.color],
                hoverBorderColor: [action.color],
                data: [action.value],
            })
        })

        return;
    }

    if (alreadyAddedLabels.length === actions.length) {
        data.datasets.find((dataset) => {
            return actions.forEach((action) => {
                if (action.value !== dataset.data[0] && action.label === dataset.label[0]) {
                    dataset.data[0] = action.value
                    return true;
                }
                return false
            })
        })
    }
}

export default updateBarChartData;
