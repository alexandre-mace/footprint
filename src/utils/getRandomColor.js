import colorByLabel from "../domain/colors/colorByLabel";

function getRandomColor(palette, index, label = null) {
    if (label !== null) {
        const guess = tryToGuessColorByLabel(label)
        if (guess) {
            return guess
        }
    }
    const randomPaletteColor = palette[index];
    return Math.round(randomPaletteColor['_rgb'][0]) + ',' +
        Math.round(randomPaletteColor['_rgb'][1]) + ',' +
        Math.round(randomPaletteColor['_rgb'][2]);
}

function tryToGuessColorByLabel(label)
{
    return colorByLabel[label];
}
export default getRandomColor;