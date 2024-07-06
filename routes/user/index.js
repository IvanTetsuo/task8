const Router = require('express');
const router = new Router();
const create = require('./create');
const deleteUser = require('./delete');
const update = require('./update');
const getList = require('./getList');
const getUser = require('./get');


router.post('/', create);
router.get('/usersList', getList);
router.get('/:userId', getUser);
router.put('/:userId', update);
router.delete('/:userId', deleteUser);


module.exports = router;