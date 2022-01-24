const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    // const { rows } = await pool.query(
    //   'INSERT INTO orders(product, quantity) VALUES ($1, $2) RETURNING *;',
    //   [req.body.product, req.body.quantity]
    // );
    const order = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity
    });
    res.json(order);
  })

  .get('/:id', async (req, res) => {
    // const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1;', [
    //   req.params.id,
    // ]);

    // if (!rows[0]) return null;
    // const order = new Order(rows[0]);
    const { id } = req.params;
    const order = await Order.getById(id);
    res.json(order);
  })

  .get('/', async (req, res) => {
    // const { rows } = await pool.query('SELECT * FROM orders;');
    // const orders = rows.map((row) => new Order(row));
    const orders = await Order.getAll();
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { product, quantity } = req.body;

    try {
      const order = await Order.updateById(id, { product, quantity });

      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.deleteById(id);
    res.json(order);
  });
