const { Router } = require('express');
const { getModel } = require('../../model');

function createRouter() {
  const router = Router();

  router.get('/', /*cache,*/ async (req, res) => {
    const Product = getModel('ProductModel');
    console.time('GET Products');
    console.log('entro');
    const products = await Product.findAll({});
    console.timeEnd('GET Products');
    res.json(products);
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
