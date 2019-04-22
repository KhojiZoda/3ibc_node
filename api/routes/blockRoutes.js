module.exports = function(app){
  const block = require('../controllers/blockController');

  app.route('/blocks')
  .get(block.list_all_blocks)
  .post(block.create_a_block);

  app.route('/blocks/:blockId')
  .get(block.read_a_block)
  .put(block.update_a_block)
  .delete(block.delete_a_block);
};
