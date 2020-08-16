import {
  select,
  scaleOrdinal,
  scaleSqrt,
  max,
  format,
} from 'd3';
import { loadAndProcessData } from './loadAndProcessData';
import { sizeLegend } from './sizeLegend';
import { choroplethMap } from './choroplethMap';

const svg = select('svg');
const choroplethMapG = svg.append('g');
const sizeLegendG = svg.append('g')
  .attr('transform', `translate(40,210)`);
const sizeScale = scaleSqrt()
const populationFormat = format(',');

let selectedColorValue;

const onClick = d => {
  selectedColorValue = d;
  render();
};

loadAndProcessData().then(({ features, featuresWithPopulation }) => {
  render({ features, featuresWithPopulation });
});

const render = ({ features, featuresWithPopulation }) => {

  sizeScale
    .domain([0, max(features, d => d.properties['2020'])])
    .range([0, 20])

  sizeLegendG.call(sizeLegend, {
    sizeScale,
    spacing: 10,
    textOffset: 10,
    numTicks: 5,
    tickFormat: populationFormat
  }).append('text')
    .attr('class', 'legend-title')
    .attr('y', -20)
    .text('Population')

  choroplethMapG.call(choroplethMap, {
    features,
    featuresWithPopulation,
  });
};