function kFormatThousands(value) {
    const lookFor = '000'
    value = value.toString();
    const last3Chars = value.slice(value.length - 3);
    if (last3Chars === '000') {
        const n = value.lastIndexOf(lookFor);
        value = value.slice(0, n) + value.slice(n).replace(lookFor, 'k');
    }
    return value;
}
export default kFormatThousands;