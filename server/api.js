const api = module.exports = require('express').Router()
const items = require('./items');
const inventory = require('./inventory');
const employees = require('./employees');
const departments = require('./department');
// import products from './products';
api
  .get('/express-test', (req, res) => res.send({express: 'working!'})) //demo route to prove api is working
  .get('/items', items)
  .get('/items/:id', items)
  .get('/departments', departments)
  .get('/departments/:id', departments)
  .get('/inventory', inventory)
  .get('/inventory/:id', inventory)
  .get('/employees', employees)
  .get('/employees/:id', employees)

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
