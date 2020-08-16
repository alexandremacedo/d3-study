import { tsv, json } from 'd3'
import { feature } from 'topojson-client'
export const loadAndProcessData = () =>
  Promise.all([
    tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
    json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
  ]).then(([tsvData, topoJSONdata]) => {
    const rowById = tsvData.reduce((accumulator, d) => {
      accumulator[d.iso_n3] = d;
      return accumulator
    }, {})

    const countries = feature(topoJSONdata, topoJSONdata.objects.countries)

    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[d.id])
    });

    return countries
  })