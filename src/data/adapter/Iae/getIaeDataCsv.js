import Papa from "papaparse";

async function getIaeDataCsv(file, setter, year) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    const years = rows.map(row => row.year).filter(value => value !== '');
    const values = Object.keys(rows[0]).filter(row => row !== 'year')
    let extractedData = {
        keys: years
        ,
        values: values.filter(value => value !== 'Units').map(value => ({
            name: value,
            data: rows.map(row => row[value])
        }))
    }

    if (year) {
        const yearIndex = years.indexOf(year);
        extractedData = extractedData.values.map(value =>
        [
            value.name,
            parseInt(value.data[yearIndex])
        ])
    }

    setter(extractedData)
}
export default getIaeDataCsv;