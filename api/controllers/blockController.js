const Block = require('../models/blockModel');

exports.list_all_blocks = function(req, res){
  Block.find({}, function(err, block){
    if(err) res.send(err);
    res.status(200).json(block);
  });
}

exports.create_a_block = function(req, res){
  var new_block = new Block(req.body);

  new_block.save(function(err, block){
    if(err) res.send(err);
    res.status(201).json(block);
  })
}

exports.read_a_block = function(req, res) {
  Block.findById(req.params.blockId, function(err, block) {
    if(err) res.send(err);
    res.json(block);
  });
};


exports.update_a_block = function(req, res) {
  Block.findOneAndUpdate({_id: req.params.blockId}, req.body, {new: true}, function(err, block) {
    if(err) res.send(err);
    res.json(block);
  });
};


exports.delete_a_block = function(req, res) {
  Block.remove({
    _id: req.params.blockId
  }, function(err, block) {
    if(err) res.send(err);
    res.json({ message: 'Block successfully deleted' });
  });
};
