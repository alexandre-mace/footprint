function getOwidDataJson(owidData, year, country) {
    let data = [];
    let years = Array.from(new Set(owidData.map(data => data.Year.toString())));
    let countries = Array.from(new Set(owidData.map(data => data.Entity)));
    countries = countries.filter(countryName => countryName !== 'World')
    countries.unshift('World')

    filterByYearAndCountry(owidData, year, country).forEach((row) => {
        if (data.filter(datum => datum.country === row.Entity).length === 0) {
            data.push({
              country: row.Entity,
              data: []
            });
        }

        let currentCountryData = data.find(datum => datum.country === row.Entity).data

        removeExtraRowKeys(Object.keys(row)).forEach(key => {
            let datumToFill = currentCountryData.filter(data => data.name === key)

            if (year && country) {
                if (datumToFill.length === 0) {
                    currentCountryData.push({
                        name: removeExtraKeyContent(key),
                        data: 0
                    });
                }

                currentCountryData.find(datum => key.includes(datum.name)).y = (formatOwidIntegerValue(row[key]))
            } else {
                if (datumToFill.length === 0) {
                    currentCountryData.push({
                        name: removeExtraKeyContent(key),
                        data: []
                    });
                }

                currentCountryData.find(datum => key.includes(datum.name)).y.push(formatOwidIntegerValue(row[key]))
            }
        })
    })

    if (country && data) {
        return {
            data: data.find(datum => datum.country === country).data,
            years : years.reverse(),
            countries: countries
        }
    }
}

const filterByYearAndCountry = (owidData, year, country) => {
    return owidData.filter(datum => {
        let passYearFilter = true;
        let passCountryFilter = true;

        if (year) {
            passYearFilter = datum.Year.toString() === year
        }

        if (country) {
            passCountryFilter = datum.Entity === country
        }

        return passYearFilter && passCountryFilter;
    })
}

const removeExtraRowKeys = (row) => {
    return row.filter(key => !['Year', 'Entity', 'Code'].includes(key))
}

const removeExtraKeyContent = (string) => {
    return string.replace(' (GHG Emissions, CAIT)', '', string)
}

const formatOwidIntegerValue = (value) => {
    return parseInt(value !== '' ? value : 0)
}

export default getOwidDataJson;