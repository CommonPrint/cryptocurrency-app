const express = require('express');
const app = express();
const request = require('request');


app.get('/cryptocurrency-list', (req, res) => {

    // URL2 BRINGS BACK THE CURRENT QUOTE AND PRICE DATA
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`
    
    const parameters = { 'slug': 'bitcoin', 'convert': 'USD' }

    request.get({
      url: url,
      json: true,
      headers: {
        'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
      },
      params: parameters
    }, (error, response, data) => {
  
      if (error) {
        return res.send({
          error: error
        });
      }

  
      res.send({
        data: data
      });
      
    });
  
});


app.get('/cryptocurrency-list/:crypto', (req, res) => {
  const crypto = req.params.crypto
  // URL BRINGS BACK ALL INFO OF THE TOKEN 
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`
  // URL2 BRINGS BACK THE CURRENT QUOTE AND PRICE DATA
  const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`

  let modifyData = {
    metadata: {},
    statistics: {}
  };

  request.get({
    url: url,
    json: true,
    headers: {
      'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
    }
  }, (error, response, data) => {

    if (error) {
      return res.send({
        error: error
      });
    }
    
    // res.send({
    //   data: data
    // });

    
    modifyData.metadata.id = data.data[`${crypto.toUpperCase()}`].id;
    modifyData.metadata.name = data.data[`${crypto.toUpperCase()}`].name;
    modifyData.metadata.symbol = data.data[`${crypto.toUpperCase()}`].symbol;
    modifyData.metadata.description = data.data[`${crypto.toUpperCase()}`].description;
    modifyData.metadata.urls = data.data[`${crypto.toUpperCase()}`].urls;
    modifyData.metadata.logo = data.data[`${crypto.toUpperCase()}`].logo;
    modifyData.metadata.subreddit = data.data[`${crypto.toUpperCase()}`].subreddit;
    
  });



  request.get({
    url: url2,
    json: true,
    headers: {
      'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
    }
  }, (error, response, data) => {

    if (error) {
      return res.send({
        error: error
      });
    }

    

    modifyData.statistics = data.data[`${crypto.toUpperCase()}`].quote;

    res.send({
      data: modifyData
    });

  });

});


app.listen(4000, () => {
  console.log('Server listening on port 4000');
});