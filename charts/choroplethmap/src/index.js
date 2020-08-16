import {
  select,
  scaleOrdinal,
  schemeSpectral,
  schemePurples,
  schemeGnBu,
  schemeBuGn,
  schemePuRd,
  schemeYlGnBu
} from 'd3';
import { loadAndProcessData } from './loadAndProcessData';
import { colorLegend } from './colorLegend';
import { choroplethMap } from './choroplethMap';

const svg = select('svg');
const choroplethMapG = svg.append('g');
const colorLegendG = svg.append('g')
  .attr('transform', `translate(40,310)`);

const colorScale = scaleOrdinal();

// const colorValue = d => d.properties.income_grp;
const colorValue = d => d.properties.economy ? d.properties.economy : '7. Least developed region';

let selectedColorValue;
let features;

const onClick = d => {
  selectedColorValue = d;
  render();
};

loadAndProcessData().then(countries => {
  features = countries.features;
  render();
});


const render = () => {
  colorScale
    .domain(features.map(colorValue))
    .domain(colorScale.domain().sort().reverse())
    .range(schemeYlGnBu[colorScale.domain().length]);

  console.log(features.map(colorValue))
  colorLegendG.call(colorLegend, {
    colorScale,
    circleRadius: 8,
    spacing: 20,
    textOffset: 12,
    backgroundRectWidth: 230,
    onClick,
    selectedColorValue
  });

  choroplethMapG.call(choroplethMap, {
    features,
    colorScale,
    colorValue,
    selectedColorValue
  });
};