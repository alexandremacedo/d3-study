import {
  select,
  csv,
} from 'd3';
import { dropdownMenu } from './dropdownMenu';
import { scatterPlot } from './scatterPlot';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let xColumn;
let yColumn;

const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const render = () => {

  select('#x-menu')
    .call(dropdownMenu, {
      options: data.columns.slice(data.columns.length / 2, data.columns.length),
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });

  select('#y-menu')
    .call(dropdownMenu, {
      options: data.columns.slice(0, (data.columns.length / 2)),
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });

  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    margin: { top: 50, right: 60, bottom: 88, left: 150 },
    width,
    height,
    data
  });
};

csv('http://localhost:3333/winequalitywhite.csv')
  .then(loadedData => {
    data = loadedData;

    console.log(data)

    data.forEach(d => {
      d.fixed_acidity = +d.fixed_acidity
      d.volatile_acidity = +d.volatile_acidity
      d.citric_acid = +d.citric_acid
      d.residual_sugar = +d.residual_sugar
      d.chlorides = +d.chlorides
      d.free_sulfur_dioxide = +d.free_sulfur_dioxide
      d.total_sulfur_dioxide = +d.total_sulfur_dioxide
      d.density = +d.density
      d.pH = +d.pH
      d.sulphates = +d.sulphates
      d.alcohol = +d.alcohol
      d.quality = +d.quality
    });

    xColumn = data.columns[7];
    yColumn = data.columns[3];
    render();
  });