import { json, csv } from 'd3'
import { feature } from 'topojson-client'
export const loadAndProcessData = () =>
  Promise.all([
    csv('https://gist.githubusercontent.com/curran/e7ed69ac1528ff32cc53b70fdce16b76/raw/61f3c156efd532ae6ed84b38102cf9a0b3b1d094/data.csv'),
    json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
  ]).then(([csvData, topoJSONdata]) => {

    const rowById = csvData.reduce((accumulator, d) => {
      accumulator[d['Country code']] = d;
      return accumulator
    }, {})

    const countries = feature(topoJSONdata, topoJSONdata.objects.countries)

    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[+d.id])
    });

    const featuresWithPopulation = countries.features
      .filter(d => d.properties['2020'])
      .map(d => {
        d.properties['2020'] = +d.properties['2020'].replace(/ /g, '') * 1000
        return d
      })

    return {
      features: countries.features,
      featuresWithPopulation
    }
  })