module.exports = function(app){
const block = require('../controllers/blockController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');

  app.get('/blocks/exchangeRate', block.get_exchange);

  app.get('/blocks/genMnemonic', block.gen_mnemonic);

  app.put('/blocks/mnemonicPrivateKey', jwtMiddleware.verify_token, block.get_mnemonic_private_key);

  app.post('/blocks/stopLoss', block.stopLoss);

  app.put('/blocks/infoAddr', jwtMiddleware.verify_token, block.getTxFromAddress);

  app.route('/blocks')
  .all(jwtMiddleware.verify_token)
  .get(block.list_all_blocks)
  .post(block.create_a_block);

  app.route('/blocks/:blockId')
  .get(block.read_a_block)
  .put(block.update_a_block)
  .delete(block.delete_a_block);

};
