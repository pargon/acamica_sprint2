const { Router } = require('express');
const { getModel } = require('../../model');

function createRouter() {
  const router = Router();

  router.get('/', /*cache,*/ async (req, res) => {
    const Order = getModel('OrderModel');
    console.time('GET Orders');
    const orders = await Order.findAll({});
    console.timeEnd('GET Orders');
    res.json(orders);
  });

/*  router.post('/', cleanCache, async (req, res) => {
    const article = req.body;
    const Post = getModel('Post');
    await Post.create(article);
    res.json(article);
  });
*/
  return router;
}

module.exports = {
  createRouter,
};
