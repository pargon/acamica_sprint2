const { Router } = require('express');
const { getModel } = require('../../model');

function createRouter() {
  const router = Router();

  router.get('/', /*cache,*/ async (req, res) => {
    const User = getModel('UserModel');
    console.log('entro user');
    console.time('GET Users');
    const users = await User.findAll({});
    console.timeEnd('GET Users');
    res.json(users);
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
