module.exports = function(app){
  const block = require('../controllers/blockController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');

  app.route('/blocks')
  .all(jwtMiddleware.verify_token)
  .get(block.list_all_blocks)
  .post(block.create_a_block);

  app.route('/blocks/:blockId')
  .get(block.read_a_block)
  .put(block.update_a_block)
  .delete(block.delete_a_block);
};
