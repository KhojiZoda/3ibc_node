const request = require('request');
const baseUrl = "https://blockchain.info";

exports.getBlockInfo = function(hash){
    return new Promise((resolve, reject) => {
      request(baseUrl + '/rawblock/' + hash, function(error, response, body){
        try{
          body = JSON.parse(body);
          var blockInfo = {
            "size": body.size,
            "prev_block": body.prev_block,
            "next_block": body.next_block
          }
          resolve(blockInfo);
        }
        catch(e){
          console.log(e);
          reject(false);
        }
      })
    })
}

exports.getExchangeRate = function(){
  return new Promise((resolve, reject) => {
    request(baseUrl + "/ticker", function(err, res, body){
        try {
          body = JSON.parse(body);
          var usdRate = body.USD
          resolve(usdRate);
        } catch (e) {
          console.log(e);
          reject(false);
        }
    });
  });
}
