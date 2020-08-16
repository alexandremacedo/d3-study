import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/worldpopulation.csv', (req, res) => {
  res.status(200).send(fs.readFileSync('./src/worldpopulation.csv', 'utf-8'));
})

app.get('/worldcountriesdata.json', (req, res) => {
  res.status(200).send(fs.readFileSync('./src/worldcountriesdata.json', 'utf-8'));
})

app.get('/startrekdata.csv', (req, res) => {
  res.status(200).send(fs.readFileSync('./src/startrekdata.csv', 'utf-8'));
})

app.get('/alcoholconsumption.csv', (req, res) => {
  res.status(200).send(fs.readFileSync('./src/alcoholconsumption.csv', 'utf-8'));
})

app.get('/winequalitywhite.csv', (req, res) => {
  res.status(200).send(fs.readFileSync('./src/winequalitywhite.csv', 'utf-8'));
})

app.listen(3333, () => {
  console.log('🛸 Server started on port 3333!');
});