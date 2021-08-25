const { Router } = require('express');
const { getModel } = require('../../model');

function createRouter() {
  const router = Router();

  router.get('/', /*cache,*/ async (req, res) => {
    const PayMeth = getModel('PayMethModel');
    console.time('GET PayMeths');
    const payMeths = await PayMeth.findAll({});
    console.timeEnd('GET PayMeths');
    res.json(payMeths);
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
