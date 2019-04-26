const Block = require('../models/blockModel');
const User = require('../models/userModel');
const blockchainApiProvider = require('../../providers/blockchainApiProvider');
const bip39 = require("bip39");
const bip32 = require("bip32");
const bip44 = require("bip44");
const bitcoin = require('bitcoinjs-lib');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');



exports.list_all_blocks = function(req, res){
  Block.find({}, function(err, block){
    if(err) res.send(err);
    res.status(200).json(block);
  });
}

exports.create_a_block = function(req, res){
  var new_block = new Block(req.body);

  const promise = blockchainApiProvider.getBlockInfo(req.body.hash);

  promise.then(response => {
    new_block['size'] = JSON.stringify(response.size);
    new_block['prev_block'] = JSON.stringify(response.prev_block);
    new_block['next_block'] = JSON.stringify(response.next_block);
  }, error => {
    console.log("Hash error");
  }).then(send => {
    new_block.save(function(err, block){
      if(err) res.send(err);
      res.status(201).json(block);
    })
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


exports.get_exchange = function(req, res){
  const promise = blockchainApiProvider.getExchangeRate();
  promise.then(response => {
    res.status(200).json(response);
  }, error => {
    console.log("Hash error");
  })
}

exports.gen_mnemonic = function (req,res){
  var  randomBytes = crypto.randomBytes(16)
  var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  res.json({mnemonic});
}


function getAddress (node, network) {
  return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

exports.get_mnemonic_private_key = function (req, res){
  var decoded = jwt.decode(req.headers['authorization'], {complete: true});
  var current_user = decoded.payload.user;
  var seed = bip39.mnemonicToSeed(req.body.mnemonic);
  var root = bip32.fromSeed(seed);
  var dp = root.derivePath("m/140'/0'/0'/0/5");
  var addr = getAddress(dp);
  User.findOneAndUpdate({email: current_user.email}, {$set: { btc_addr: addr }}, {new: true}, (err, done)=>{
    if(err) res.send(err);
    res.json({user: done});
  })

}

exports.stopLoss = function(req, res){
 const promise = blockchainApiProvider.getExchangeRate();
 var resp;
 promise.then(response => {
   if(response.last > req.body.amount){
     resp = {"gain":"true","total_gain":  ((response.last - req.body.amount)*req.body.quantity).toString()  ,"opinion":"You can sell"};
   }else{
     resp = {"gain":"false","total_loss" : ((response.last - req.body.amount)*req.body.quantity).toString()  ,"opinion":"You may hold"};
   }
   res.status(200).json(resp);
 }, error => {
   console.log("Hash error");
 })
}


exports.getTxFromAddress = function (req,res){
 const promise = blockchainApiProvider.getAddrInfo(req.body.btc_addr);
 promise.then(response => {
   res.status(200).json(response);
 })
}
