import Papa from "papaparse";

async function getOwidDataCsv(file, rows = false, setter, year, country) {
    if (!rows) {
        const response = await fetch(file)
        const reader = response.body.getReader()
        const result = await reader.read() // raw array
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
        rows = results.data // array of objects
    }

    let data = [];
    let years = [];
    let countries = [];

    rows.forEach((row) => {
        if (!data[row['Entity']]) {
            data[row['Entity']] = [];
        }

        if (!countries.includes(row['Entity'])) {
            countries.push(row['Entity']);
        }

        if (!years.includes(row['Year'])) {
            years.push(row['Year']);
        }

        Object.keys(row).filter(key => !['Year', 'Entity', 'Code'].includes(key)).forEach(key => {
            if (year && row['Year'] !== year) {
                return;
            }

            let datumToFill = data[row['Entity']].filter(data => data.name === key)
            if (datumToFill.length === 0) {
                if (year && country) {
                    data[row['Entity']].push({
                        name: removeExtraKeyContent(key),
                        data: 0
                    });
                } else {
                    data[row['Entity']].push({
                        name: removeExtraKeyContent(key),
                        data: []
                    });
                }
            }

            if (year && country) {
                data[row['Entity']].filter(data => key.includes(data.name))[0].y = (parseInt(row[key] !== '' ? row[key] : 0))
            } else {
                data[row['Entity']].filter(data => key.includes(data.name))[0].y.push(parseInt(row[key] !== '' ? row[key] : 0))
            }
        })
    })

    if (country && data) {
        setter({
            data: data[country],
            rows: rows,
            years : years.reverse(),
            countries: countries
        })
    }
}

const removeExtraKeyContent = (string) => {
    return string.replace(' (GHG Emissions, CAIT)', '', string)
}

export default getOwidDataCsv;